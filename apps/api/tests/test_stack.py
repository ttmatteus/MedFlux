import pytest

from app.data_structures import Ticket, TicketStack


def test_ticket_stack_push_pop_and_latest():
    """Testa operações de push, pop e consulta do histórico"""
    stack = TicketStack(max_size=3)
    tickets = [
        Ticket(code="H001", priority="HIGH"),
        Ticket(code="H002", priority="HIGH"),
        Ticket(code="H003", priority="HIGH"),
        Ticket(code="H004", priority="HIGH"),
    ]

    for ticket in tickets:
        stack.push(ticket)

    # Como o tamanho máximo é 3, o primeiro deve ter sido descartado
    latest = stack.latest(limit=3)
    assert [t.code for t in latest] == ["H004", "H003", "H002"]

    assert stack.pop().code == "H004"
    assert stack.pop().code == "H003"
    assert stack.pop().code == "H002"
    assert stack.pop() is None

