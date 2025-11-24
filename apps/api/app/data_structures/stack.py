"""
Pilha (LIFO) para Histórico de Atendimentos
"""
from typing import List, Optional

from .ticket import Ticket


class TicketStack:
    """
    Pilha LIFO para armazenar histórico recente de tickets atendidos.
    Descarta automaticamente itens mais antigos quando excede max_size.
    """

    def __init__(self, max_size: int = 50) -> None:
        self.max_size = max_size
        self._stack: List[Ticket] = []

    def push(self, ticket: Ticket) -> None:
        self._stack.append(ticket)# Adiciona no topo
        if len(self._stack) > self.max_size:# Remove o mais antigo se passou do limite
            self._stack.pop(0)

    def pop(self) -> Optional[Ticket]:
        if not self._stack: # Verifica se a pilha está vazia.
            return None
        return self._stack.pop() # Remove e retorna o último elemento da lista.

    def latest(self, limit: int = 10) -> List[Ticket]:
        return self._stack[-limit:][::-1] # Pega os últimos 'limit' itens


