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
        """
        TODO: Inicializar lista interna e guardar max_size.
        """
        pass

    def push(self, ticket: Ticket) -> None:
        """
        Adiciona ticket no topo da pilha.
        
        TODO: Implementar inserção.
        Se o tamanho exceder max_size, remover o item mais antigo (primeiro da lista).
        """
        pass

    def pop(self) -> Optional[Ticket]:
        """
        Remove e retorna o último ticket da pilha.
        
        TODO: Implementar remoção do topo.
        Retornar None se a pilha estiver vazia.
        """
        pass

    def latest(self, limit: int = 10) -> List[Ticket]:
        """
        Retorna os últimos N tickets em ordem cronológica reversa.
        
        TODO: Pegar os últimos 'limit' items e inverter a ordem.
        Exemplo: se pilha = [A, B, C], latest(2) deve retornar [C, B]
        """
        pass

