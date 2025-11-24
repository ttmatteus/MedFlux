"""
Utilitário simples para popular a fila de tickets com dados falsos.

Uso:
    python seed_tickets.py --api http://localhost:8000/api --quantidade 5
"""

from __future__ import annotations

import argparse
import random
import sys
from typing import List, Tuple

import requests

DEFAULT_TICKETS: List[Tuple[str, str]] = [
    ("Maria Antunes", "Emergência"),
    ("Leonardo Farias", "Muito Urgente"),
    ("Patrícia Costa", "Urgente"),
    ("Rogério Lima", "Pouco Urgente"),
    ("Talita Souza", "Não Urgente"),
]


def seed(api_base: str, total: int) -> None:
    url = f"{api_base.rstrip('/')}/tickets"
    pool = DEFAULT_TICKETS.copy()

    if total > len(pool):
        extra = total - len(pool)
        priorities = [item[1] for item in pool]
        pool.extend(
            (f"Paciente Demo {idx+1}", random.choice(priorities))
            for idx in range(extra)
        )

    created = 0
    for name, priority in pool[:total]:
        payload = {
            "patient_name": name,
            "priority": priority,
            "notes": "Seed automático",
        }
        response = requests.post(url, json=payload, timeout=10)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:
            print(f"[ERRO] Falha ao criar {name} ({priority}): {exc}", file=sys.stderr)
            print(f"Detalhes: {response.text}", file=sys.stderr)
            continue

        data = response.json()
        ticket_code = data.get("ticket", {}).get("code", "???")
        print(f"[OK] {ticket_code} -> {name} ({priority})")
        created += 1

    print(f"\nTotal criado: {created}/{total}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Popular fila de tickets.")
    parser.add_argument(
        "--api",
        default="http://localhost:8000/api",
        help="Base da API (default: http://localhost:8000/api)",
    )
    parser.add_argument(
        "--quantidade",
        type=int,
        default=5,
        help="Quantidade de tickets a criar (default: 5)",
    )
    args = parser.parse_args()

    seed(args.api, args.quantidade)

