from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(
    title="API Tensions Scolaires",
    description="Analyse des tensions scolaires pour les élections municipales 2026",
    version="1.0.0"
)

# CORS API pour react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)