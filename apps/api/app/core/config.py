import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Configurações básicas da aplicação"""
    
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Limites das estruturas
    STACK_MAX_SIZE: int = 50
    MAX_QUEUE_SIZE: int = 100
    
    # Banco de dados SQLite
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATABASE_PATH: Path = BASE_DIR / "medflux.db"
    DATABASE_URL: str = f"sqlite:///{DATABASE_PATH}"

    # Autenticação / JWT
    JWT_SECRET: str = os.environ["JWT_SECRET"]
    JWT_ALGORITHM: str = os.environ["JWT_ALGORITHM"]
    JWT_EXPIRES_MINUTES: int = int(os.environ["JWT_EXPIRES_MINUTES"])


settings = Settings()
