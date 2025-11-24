"""
Modelo de Ticket (Senha de Atendimento)
"""
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional


@dataclass
class Ticket:
    """
    Representa uma senha de atendimento.
    
    - Implementar atributos obrigatórios: code, priority
    - Implementar atributos opcionais: patient_name, notes
    """
    code: str
    priority: str
    patient_name: Optional[str] = None
    notes: Optional[str] = None
    status: str = "waiting"
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))

