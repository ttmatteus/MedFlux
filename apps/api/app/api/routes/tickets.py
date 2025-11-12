
from fastapi import APIRouter

router = APIRouter(prefix="/tickets")


@router.post("/")
async def create_ticket():
    return {"message": "TODO: implementar criação de ticket"}


@router.get("/")
async def list_tickets():
    return {"message": "TODO: listar filas de tickets"}


@router.post("/{priority}/call")
async def call_next(priority: str):
    return {"message": f"TODO: chamar próximo ticket da prioridade {priority}"}


@router.get("/history")
async def latest_history():
    return {"message": "TODO: retornar histórico recente"}

