import pytest

from app.data_structures import HashTable


def test_hash_table_set_get_remove():
    """Testa operações básicas de inserção, busca e remoção"""
    table: HashTable[str, dict] = HashTable()

    table.set("token-123", {"user": "Ana"})
    assert table.get("token-123") == {"user": "Ana"}

    table.remove("token-123")
    assert table.get("token-123") is None


def test_hash_table_iter_items():
    """Testa iteração sobre os itens da tabela hash"""
    table: HashTable[str, int] = HashTable()
    table.set("a", 1)
    table.set("b", 2)

    items = dict(table.items())
    assert items == {"a": 1, "b": 2}

