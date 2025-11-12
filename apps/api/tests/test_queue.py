import pytest

from app.data_structures import Ticket, TicketQueue


def test_ticket_queue_enqueue_dequeue():
    """Testa operações básicas de enfileirar e desenfileirar"""
    queue = TicketQueue()
    ticket_a = Ticket(code="EM01", priority="EMERGENCY")
    ticket_b = Ticket(code="EM02", priority="EMERGENCY")

    queue.enqueue(ticket_a)
    queue.enqueue(ticket_b)

    assert len(queue) == 2
    assert queue.dequeue() == ticket_a
    assert queue.dequeue() == ticket_b
    assert queue.dequeue() is None

