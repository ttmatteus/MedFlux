
from typing import Optional

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel, Field, field_validator

from app.core.config import settings
from app.data_structures import Ticket
from app.services.ticket_service import ticket_service

router = APIRouter(prefix="/tickets")


class CreateTicketPayload(BaseModel):
    patient_name: str = Field(..., min_length=3, max_length=120)
    priority: str = Field(..., min_length=3, max_length=32)
    notes: Optional[str] = Field(default=None, max_length=500)

    @field_validator("patient_name", "priority")
    @classmethod
    def strip_required(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("campo obrigatório")
        return cleaned

    @field_validator("notes")
    @classmethod
    def strip_optional(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None


class TicketResponse(BaseModel):
    code: str
    priority: str
    patient_name: Optional[str]
    notes: Optional[str]
    status: str
    created_at: str


def serialize_ticket(ticket: Ticket) -> TicketResponse:
    return TicketResponse(
        code=ticket.code,
        priority=ticket.priority,
        patient_name=ticket.patient_name,
        notes=ticket.notes,
        status=ticket.status,
        created_at=ticket.created_at.isoformat(),
    )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_ticket(payload: CreateTicketPayload):
    try:
        ticket = ticket_service.create_ticket(
            priority=payload.priority,
            patient_name=payload.patient_name,
            notes=payload.notes,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return {"ticket": serialize_ticket(ticket)}


@router.get("/")
async def list_tickets(priority: Optional[str] = Query(default=None)):
    try:
        tickets = ticket_service.list_queue(priority=priority)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return {"tickets": [serialize_ticket(ticket) for ticket in tickets]}


@router.post("/{priority}/call")
async def call_next(priority: str):
    try:
        ticket = ticket_service.call_next(priority)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Nenhum ticket nessa prioridade",
        )
    return {"ticket": serialize_ticket(ticket)}


@router.get("/history")
async def latest_history(limit: int = Query(default=10, ge=1, le=settings.STACK_MAX_SIZE)):
    tickets = ticket_service.latest_history(limit=limit)
    return {"tickets": [serialize_ticket(ticket) for ticket in tickets]}
