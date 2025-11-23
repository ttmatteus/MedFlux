from typing import Dict, Generic, Iterator, Optional, Tuple, TypeVar

K = TypeVar("K") 
V = TypeVar("V") 

class HashTable(Generic[K, V]):

    def __init__(self) -> None:
        self._data: Dict[(K, V)] = {}

    def set(self, key: K, value: V) -> None:
        self._data[key] = value

    def get(self, key: K) -> Optional[V]:
        return self._data.get(key)
    
    def remove(self, key: K) -> None:
        self._data.pop(key, None)

    def items(self) -> Iterator[Tuple[K, V]]:
        return self._data.items()