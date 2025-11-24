"""
Script para inicializar o banco de dados SQLite.

Cria as tabelas principais do sistema:
- users: usuários do sistema
- tickets: tickets de atendimento
- sessions: sessões ativas de usuários
"""

import sqlite3
from pathlib import Path

from passlib.context import CryptContext

DB_PATH = Path(__file__).parent / "medflux.db"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def init_database():
    """Inicializa o banco de dados com as tabelas necessárias"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Tabela de usuários
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'atendente',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Tabela de tickets
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_number TEXT UNIQUE NOT NULL,
            patient_name TEXT NOT NULL,
            priority TEXT NOT NULL,
            notes TEXT,
            status TEXT DEFAULT 'waiting',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            called_at TIMESTAMP,
            finished_at TIMESTAMP
        )
    """)
    
    # Tabela de sessões
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT UNIQUE NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Usuários padrão
    default_users = [
        ("admin", "admin123", "admin"),
        ("rafaelatexeira", "rafa123", "admin"),
    ]

    for username, password, role in default_users:
        try:
            hashed = pwd_context.hash(password)
            cursor.execute(
                """
                INSERT INTO users (username, password_hash, role)
                VALUES (?, ?, ?)
                """,
                (username, hashed, role),
            )
            print(f"[OK] Usuario {username} criado (senha: {password})")
        except sqlite3.IntegrityError:
            print(f"[INFO] Usuario {username} ja existe")
    
    conn.commit()
    conn.close()
    
    print(f"[OK] Banco de dados inicializado em: {DB_PATH}")
    print("[OK] Tabelas criadas: users, tickets, sessions")


if __name__ == "__main__":
    init_database()

