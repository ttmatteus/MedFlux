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
        TODO: Inicializar deque interno para armazenar tickets.
        """
        pass

    def enqueue(self, ticket: Ticket) -> None:
        """
        Adiciona um ticket no fim da fila.
        
        TODO: Implementar inserção no final do deque.
        """
        pass

    def dequeue(self) -> Optional[Ticket]:
        """
        Remove e retorna o primeiro ticket da fila.
        
        TODO: Implementar remoção do início do deque.
        Retornar None se a fila estiver vazia.
        """
        pass

    def __len__(self) -> int:
        """
        TODO: Retornar quantidade de tickets na fila.
        """
        pass

    def __iter__(self) -> Iterator[Ticket]:
        """
        TODO: Permitir iteração sobre os tickets da fila.
        """
        pass

