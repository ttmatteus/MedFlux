from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Dict, Optional
from uuid import uuid4

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings
from app.data_structures import HashTable


class InvalidCredentialsError(Exception):
    """Erro para credenciais inválidas."""


class SessionNotFoundError(Exception):
    """Erro para sessões inexistentes/expiradas."""


@dataclass
class SessionData:
    jti: str
    user_id: int
    username: str
    role: str
    created_at: datetime
    expires_at: datetime

    def to_response(self) -> Dict[str, object]:
        return {
            "user": {
                "id": self.user_id,
                "username": self.username,
                "role": self.role,
            },
            "created_at": self.created_at.isoformat(),
            "expires_at": self.expires_at.isoformat(),
        }


class SessionStore:
    """Armazena sessões em memória usando HashTable (para revogar JWTs)."""

    def __init__(self) -> None:
        self._table: HashTable[str, SessionData] = HashTable()

    def create(self, user_id: int, username: str, role: str, ttl_minutes: int) -> SessionData:
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(minutes=ttl_minutes)
        jti = str(uuid4())
        session = SessionData(
            jti=jti,
            user_id=user_id,
            username=username,
            role=role,
            created_at=now,
            expires_at=expires_at,
        )
        self._table.set(jti, session)
        return session

    def get(self, jti: str) -> Optional[SessionData]:
        session = self._table.get(jti)
        if session and session.expires_at < datetime.now(timezone.utc):
            self.remove(jti)
            return None
        return session

    def remove(self, jti: str) -> None:
        self._table.remove(jti)


class AuthService:
    """Autenticação com SQLite + JWT + HashTable (revogação)."""

    def __init__(self, database_path: str = str(settings.DATABASE_PATH)) -> None:
        self._database_path = database_path
        self._sessions = SessionStore()
        self._pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self._database_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _fetch_user(self, username: str) -> Optional[sqlite3.Row]:
        with self._get_connection() as conn:
            cursor = conn.execute(
                "SELECT id, username, password_hash, role FROM users WHERE username = ?",
                (username,),
            )
            return cursor.fetchone()

    def login(self, username: str, password: str) -> Dict[str, object]:
        user = self._fetch_user(username)
        if not user or not self._pwd_context.verify(password, user["password_hash"]):
            raise InvalidCredentialsError("Credenciais inválidas")

        session = self._sessions.create(
            user_id=user["id"],
            username=user["username"],
            role=user["role"],
            ttl_minutes=settings.JWT_EXPIRES_MINUTES,
        )
        token = self._encode_token(session)
        data = session.to_response()
        data["token"] = token
        return data

    def logout(self, token: str) -> None:
        payload = self._decode_token(token)
        jti = payload.get("jti")
        if not jti:
            raise SessionNotFoundError("Token inválido")
        session = self._sessions.get(jti)
        if not session:
            raise SessionNotFoundError("Sessão não encontrada")
        self._sessions.remove(jti)

    def validate(self, token: str) -> Dict[str, object]:
        payload = self._decode_token(token)
        jti = payload.get("jti")
        if not jti:
            raise SessionNotFoundError("Token inválido")
        session = self._sessions.get(jti)
        if not session:
            raise SessionNotFoundError("Sessão inválida")
        data = session.to_response()
        data["token"] = token
        return data

    def _encode_token(self, session: SessionData) -> str:
        payload = {
            "sub": str(session.user_id),
            "username": session.username,
            "role": session.role,
            "jti": session.jti,
            "iat": int(session.created_at.timestamp()),
            "exp": int(session.expires_at.timestamp()),
        }
        return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

    def _decode_token(self, token: str) -> Dict[str, object]:
        try:
            return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        except JWTError as exc:
            raise SessionNotFoundError("Token inválido ou expirado") from exc


auth_service = AuthService()
