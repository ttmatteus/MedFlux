"""
Script para inicializar o banco de dados SQLite.

Cria as tabelas principais do sistema:
- users: usuários do sistema
- tickets: tickets de atendimento
- sessions: sessões ativas de usuários
"""

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "medflux.db"


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
    
    # Inserir usuário admin padrão (apenas para desenvolvimento)
    try:
        cursor.execute("""
            INSERT INTO users (username, password_hash, role)
            VALUES (?, ?, ?)
        """, ("admin", "admin123", "admin"))
        print("[OK] Usuario admin criado (username: admin, password: admin123)")
    except sqlite3.IntegrityError:
        print("[INFO] Usuario admin ja existe")
    
    conn.commit()
    conn.close()
    
    print(f"[OK] Banco de dados inicializado em: {DB_PATH}")
    print("[OK] Tabelas criadas: users, tickets, sessions")


if __name__ == "__main__":
    init_database()

