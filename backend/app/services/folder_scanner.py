import json

from pathlib import Path

from app.services.filename_parser import parse_broadcast_filename
from app.services.coverage_analyzer import analyze_coverage
from app.services.anomaly_detector import detect_anomalies


VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mxf"}


def scan_folder(folder_path: str):
    folder = Path(folder_path)

    if not folder.exists():
        raise FileNotFoundError(f"Folder not found: {folder_path}")

    video_files = []

    for file in folder.rglob("*"):
        if file.is_file() and file.suffix.lower() in VIDEO_EXTENSIONS:
            video_files.append(file.name)

    return video_files


if __name__ == "__main__":
    TARGET_FOLDER = r"..\sample_data\sample_files"

    files = scan_folder(TARGET_FOLDER)

    print(f"Detected files: {len(files)}")

    coverage = analyze_coverage(files)
    anomalies = detect_anomalies(files)

    print("\n=== COVERAGE REPORT ===")
    print(coverage)

    print("\n=== ANOMALIES ===")
    for anomaly in anomalies:
        print(anomaly)

    output = {
        "detected_files": len(files),
        "coverage": coverage,
        "anomalies": anomalies,
    }

    with open("reports/archive_report.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print("\nReport saved to reports/archive_report.json")