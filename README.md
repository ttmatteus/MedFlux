# MedFlux

## Visão Geral
Sistema simples para gerenciar filas de atendimento usando estruturas de dados (Fila, Pilha e Tabela Hash).

## Estrutura do Projeto
```
apps/
  api/                  # Backend Python
    app/
      data_structures/  # Implementações de Fila, Pilha e Hash
      services/         # Lógica de negócio
      api/routes/       # Endpoints REST
      core/             # Configurações
    tests/              # Testes das estruturas
  web/                  # Frontend (a implementar)
docs/                   # Documentação
```

## Rodando a API

1. Entre em `apps/api`
2. Instale as dependências: `pip install -r requirements.txt`
3. **Inicialize o banco de dados:** `python init_db.py`
   - Cria o arquivo `medflux.db` com as tabelas necessárias
   - Usuário admin padrão: `admin` / `admin123`
4. Rode a API: `python -m uvicorn app.main:app --reload`
5. Acesse `http://localhost:8000/api/ping` para testar
6. Documentação `http://localhost:8000/docs`

## Testando as Estruturas de Dados

IMPORTANTE: Os testes estão PRÉ-DEFINIDOS e vão FALHAR até que as estruturas
sejam implementadas. Isso é intencional e faz parte da metodologia TDD (Test-Driven Development)

Os testes servem como:
- Especificação do comportamento esperado
- Documentação de como usar as estruturas
- Validação automática quando implementadas

```bash
cd apps/api
# Rodar todos os testes
python -m pytest tests/ -v

# Ou rodar testes específicos
python -m pytest tests/test_queue.py -v      # Testes da Fila
python -m pytest tests/test_stack.py -v      # Testes da Pilha
python -m pytest tests/test_hash_table.py -v # Testes da Tabela Hash
```

## Stack Tecnológico
- **Backend**: Python + FastAPI
- **Banco de Dados**: SQLite (para persistência)
- **Estruturas em Memória**: Fila (deque), Pilha (list), Hash (dict)
- **Testes**: pytest

