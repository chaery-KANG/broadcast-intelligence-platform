from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_report import router as report_router

app = FastAPI(
    title="Broadcast Intelligence Platform",
    description="Secure broadcast archive metadata analysis API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report_router)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "Broadcast Intelligence Platform",
    }