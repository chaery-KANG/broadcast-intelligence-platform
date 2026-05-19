from fastapi import FastAPI

from app.api.routes_report import router as report_router

app = FastAPI(
    title="Broadcast Intelligence Platform",
    description="Secure broadcast archive metadata analysis API",
    version="0.1.0",
)

app.include_router(report_router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "Broadcast Intelligence Platform"}