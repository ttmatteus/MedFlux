from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Dict, Optional
from uuid import uuid4

from app.core.config import settings
from app.data_structures import HashTable


class InvalidCredentialsError(Exception):
    """Erro para credenciais inválidas."""


class SessionNotFoundError(Exception):
    """Erro para sessões inexistentes/expiradas."""


@dataclass
class SessionData:
    token: str
    user_id: int
    username: str
    role: str
    created_at: datetime
    expires_at: Optional[datetime] = None

    def to_response(self) -> Dict[str, object]:
        return {
            "token": self.token,
            "user": {
                "id": self.user_id,
                "username": self.username,
                "role": self.role,
            },
            "created_at": self.created_at.isoformat(),
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
        }


class SessionStore:
    """Armazena sessões em memória usando HashTable."""

    def __init__(self) -> None:
        self._table: HashTable[str, SessionData] = HashTable()

    def create(self, user_id: int, username: str, role: str, ttl_minutes: int = 240) -> SessionData:
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(minutes=ttl_minutes) if ttl_minutes else None
        token = str(uuid4())
        session = SessionData(
            token=token,
            user_id=user_id,
            username=username,
            role=role,
            created_at=now,
            expires_at=expires_at,
        )
        self._table.set(token, session)
        return session

    def get(self, token: str) -> Optional[SessionData]:
        session = self._table.get(token)
        if session and session.expires_at and session.expires_at < datetime.now(timezone.utc):
            self.remove(token)
            return None
        return session

    def remove(self, token: str) -> None:
        self._table.remove(token)


class AuthService:
    """Autenticação simples usando SQLite + HashTable."""

    def __init__(self, database_path: str = str(settings.DATABASE_PATH)) -> None:
        self._database_path = database_path
        self._sessions = SessionStore()

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
        if not user or user["password_hash"] != password:
            raise InvalidCredentialsError("Credenciais inválidas")

        session = self._sessions.create(
            user_id=user["id"],
            username=user["username"],
            role=user["role"],
        )
        return session.to_response()

    def logout(self, token: str) -> None:
        session = self._sessions.get(token)
        if not session:
            raise SessionNotFoundError("Sessão não encontrada")
        self._sessions.remove(token)

    def validate(self, token: str) -> Dict[str, object]:
        session = self._sessions.get(token)
        if not session:
            raise SessionNotFoundError("Sessão inválida")
        return session.to_response()


auth_service = AuthService()
