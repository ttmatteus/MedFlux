import os
from pathlib import Path


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


settings = Settings()
