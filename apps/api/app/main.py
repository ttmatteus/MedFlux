from fastapi import FastAPI

from .api import router as api_router

app = FastAPI(
    title="MedFlux API",
    description="Skeleton da API para gerenciamento de filas. Contém apenas rotas de teste.",
    version="0.1.0",
)


@app.get("/health", tags=["health"])
async def health_check():
    return {"status": "ok"}


app.include_router(api_router, prefix="/api")

