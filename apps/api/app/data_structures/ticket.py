"""
Modelo de Ticket (Senha de Atendimento)
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class Ticket:
    """
    Representa uma senha de atendimento.
    
    TODO para o dev:
    - Implementar atributos obrigatórios: code, priority
    - Implementar atributos opcionais: patient_name, notes
    """
    code: str
    priority: str
    patient_name: Optional[str] = None
    notes: Optional[str] = None

