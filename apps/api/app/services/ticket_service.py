from __future__ import annotations

import unicodedata
from typing import Dict, List, Optional

from app.core.config import settings
from app.data_structures import Ticket, TicketQueue, TicketStack

PRIORITY_LABELS = [
    "Emergência",
    "Muito Urgente",
    "Urgente",
    "Pouco Urgente",
    "Não Urgente",
]

PRIORITY_CODES = {
    "Emergência": "EME",
    "Muito Urgente": "MUI",
    "Urgente": "URG",
    "Pouco Urgente": "POU",
    "Não Urgente": "NAU",
}


def _canonical(value: str) -> str:
    """Normaliza texto removendo acentos e espaços extras."""
    normalized = unicodedata.normalize("NFD", value or "")
    without_accents = "".join(ch for ch in normalized if unicodedata.category(ch) != "Mn")
    return without_accents.lower().strip()


class TicketService:
    """Orquestra fila, pilha e histórico de tickets em memória."""

    def __init__(self, history_size: int = settings.STACK_MAX_SIZE) -> None:
        self._queue = TicketQueue()
        self._history = TicketStack(history_size)
        self._counters: Dict[str, int] = {priority: 0 for priority in PRIORITY_LABELS}
        self._priority_lookup: Dict[str, str] = {
            _canonical(priority): priority for priority in PRIORITY_LABELS
        }

    def _resolve_priority(self, priority: str) -> str:
        key = _canonical(priority)
        if key not in self._priority_lookup:
            raise ValueError("Prioridade inválida")
        return self._priority_lookup[key]

    def _generate_code(self, priority: str) -> str:
        self._counters[priority] += 1
        prefix = PRIORITY_CODES[priority]
        return f"{prefix}{self._counters[priority]:04d}"

    def create_ticket(
        self, *, priority: str, patient_name: str, notes: Optional[str] = None
    ) -> Ticket:
        resolved_priority = self._resolve_priority(priority)
        ticket = Ticket(
            code=self._generate_code(resolved_priority),
            priority=resolved_priority,
            patient_name=patient_name,
            notes=notes,
        )
        self._queue.enqueue(ticket)
        return ticket

    def list_queue(self, priority: Optional[str] = None) -> List[Ticket]:
        resolved_priority = self._resolve_priority(priority) if priority else None
        tickets = list(self._queue)
        if resolved_priority:
            tickets = [ticket for ticket in tickets if ticket.priority == resolved_priority]
        return tickets

    def call_next(self, priority: str) -> Optional[Ticket]:
        resolved_priority = self._resolve_priority(priority)
        called_ticket: Optional[Ticket] = None
        buffer: List[Ticket] = []

        while True:
            current = self._queue.dequeue()
            if current is None:
                break
            if called_ticket is None and current.priority == resolved_priority:
                called_ticket = current
                continue
            buffer.append(current)

        for ticket in buffer:
            self._queue.enqueue(ticket)

        if called_ticket:
            called_ticket.status = "called"
            self._history.push(called_ticket)

        return called_ticket

    def latest_history(self, limit: int = 10) -> List[Ticket]:
        return self._history.latest(limit=limit)

    def reset(self) -> None:
        """Limpa fila, histórico e contadores (útil para testes manuais)."""
        self._queue = TicketQueue()
        self._history = TicketStack(settings.STACK_MAX_SIZE)
        self._counters = {priority: 0 for priority in PRIORITY_LABELS}


ticket_service = TicketService()
