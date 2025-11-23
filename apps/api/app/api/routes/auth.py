
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field, validator

from app.services.auth_service import (
    InvalidCredentialsError,
    SessionNotFoundError,
    auth_service,
)


class LoginPayload(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern=r"^[A-Za-z]+$")
    password: str = Field(..., min_length=4, max_length=100)

    @validator("username", "password")
    def strip_and_validate(cls, value: str):  
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("campo não pode ser vazio")
        return cleaned


class LogoutPayload(BaseModel):
    token: str = Field(..., min_length=10, max_length=2048)

    @validator("token")
    def validate_token(cls, value: str):  
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("token não pode ser vazio")
        return cleaned


router = APIRouter(prefix="/sessions")


@router.post("/login")
async def login(payload: LoginPayload):
    try:
        return auth_service.login(payload.username, payload.password)
    except InvalidCredentialsError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(payload: LogoutPayload):
    try:
        auth_service.logout(payload.token)
    except SessionNotFoundError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))

