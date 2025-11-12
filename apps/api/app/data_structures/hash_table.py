"""
Tabela Hash para Sessões/Usuários
"""
from typing import Dict, Generic, Iterator, Optional, Tuple, TypeVar

K = TypeVar("K")
V = TypeVar("V")


class HashTable(Generic[K, V]):
    """
    Wrapper sobre dict do Python para demonstrar uso de tabela hash.
    Usado para armazenar sessões/tokens em memória.
    """

    def __init__(self) -> None:
        """
        TODO: Inicializar dict interno.
        """
        pass

    def set(self, key: K, value: V) -> None:
        """
        Armazena um par chave-valor.
        
        TODO: Implementar inserção no dict.
        """
        pass

    def get(self, key: K) -> Optional[V]:
        """
        Retorna o valor associado à chave.
        
        TODO: Implementar busca no dict.
        Retornar None se a chave não existir.
        """
        pass

    def remove(self, key: K) -> None:
        """
        Remove uma chave da tabela.
        
        TODO: Implementar remoção do dict.
        Não gerar erro se a chave não existir.
        """
        pass

    def items(self) -> Iterator[Tuple[K, V]]:
        """
        Retorna iterador de pares (chave, valor).
        
        TODO: Retornar iterador do dict.items().
        """
        pass

