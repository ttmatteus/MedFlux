"""
Fila (FIFO) de Tickets por Prioridade
"""
from collections import deque
from typing import Deque, Iterator, Optional

from .ticket import Ticket


class TicketQueue:
    """
    Fila FIFO para gerenciar tickets por prioridade.
    Utiliza deque para operações O(1).
    """

    def __init__(self) -> None:
        """
        Cria uma fila vazia baseada em deque para operações O(1).
        """
        self._queue: Deque[Ticket] = deque()

    def enqueue(self, ticket: Ticket) -> None:
        """
        Adiciona um ticket no fim da fila mantendo a ordem FIFO.
        """
        self._queue.append(ticket)

    def dequeue(self) -> Optional[Ticket]:
        """
        Remove e retorna o primeiro ticket da fila.

        Retorna None quando a fila está vazia.
        """
        if not self._queue:
            return None
        return self._queue.popleft()

    def __len__(self) -> int:
        """
        Retorna a quantidade de tickets atualmente enfileirados.
        """
        return len(self._queue)

    def __iter__(self) -> Iterator[Ticket]:
        """
        Permite iteração preservando a ordem atual da fila.
        """
        return iter(self._queue)

