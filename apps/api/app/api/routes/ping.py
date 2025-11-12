from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
async def ping():
    """
    Endpoint de teste rápido para verificar se a API está respondendo.
    """
    return {"message": "API online"}

