
from fastapi import APIRouter

router = APIRouter(prefix="/sessions")


@router.post("/login")
async def login():
    return {"message": "TODO: implementar login"}


@router.post("/logout")
async def logout():
    return {"message": "TODO: implementar logout"}

