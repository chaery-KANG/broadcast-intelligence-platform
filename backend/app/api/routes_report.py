import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()

REPORT_PATH = Path("reports/archive_report.json")


@router.get("/report")
def get_report():
    if not REPORT_PATH.exists():
        raise HTTPException(status_code=404, detail="Report file not found")

    with open(REPORT_PATH, "r", encoding="utf-8") as f:
        return json.load(f)