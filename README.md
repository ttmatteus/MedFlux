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
  web/                  # Frontend (React + Tailwind)
docs/                   # Documentação
```

---

## Rodando o Frontend

1. Entre em `apps/web`
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Rode o projeto:

   ```bash
   npm run dev
   ```
4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

---

## Rodando a API

1. Entre em `apps/api`
2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```
3. **Inicialize o banco de dados:**

   ```bash
   python init_db.py
   ```

   * Cria o arquivo `medflux.db`
   * Usuário admin padrão: `admin` / `admin123`
4. Rode a API:

   ```bash
   python -m uvicorn app.main:app --reload
   ```
5. Teste:

   ```
   http://localhost:8000/api/ping
   ```
6. Docs:

   ```
   http://localhost:8000/docs
   ```

---

## Testando as Estruturas de Dados

Os testes já estão criados e **vão falhar até você implementar as estruturas** — metodologia TDD.

Eles servem como:

* especificação
* documentação
* validação automática

```bash
cd apps/api

# Todos os testes
python -m pytest tests/ -v

# Testes específicos
python -m pytest tests/test_queue.py -v
python -m pytest tests/test_stack.py -v
python -m pytest tests/test_hash_table.py -v
```


