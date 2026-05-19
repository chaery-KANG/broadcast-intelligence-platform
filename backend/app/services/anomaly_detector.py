from app.services.filename_parser import parse_broadcast_filename
from app.services.coverage_analyzer import analyze_coverage


def detect_anomalies(file_list: list[str]):
    coverage = analyze_coverage(file_list)
    anomalies = []

    for date, report in coverage.items():
        for slot in report["missing_slots"]:
            anomalies.append({
                "date": date,
                "type": "MISSING_SLOT",
                "severity": "HIGH",
                "message": f"Required broadcast slot is missing: {slot}",
            })

        if report["fallback_used"]:
            anomalies.append({
                "date": date,
                "type": "FALLBACK_USED",
                "severity": "MEDIUM",
                "message": "Fallback recording was used for one or more slots.",
            })

        if report["clean_count"] != report["oa_count"]:
            anomalies.append({
                "date": date,
                "type": "VERSION_IMBALANCE",
                "severity": "LOW",
                "message": f"CLEAN/OA count mismatch: CLEAN={report['clean_count']}, OA={report['oa_count']}",
            })

    for file_name in file_list:
        metadata = parse_broadcast_filename(file_name)

        if metadata.normalized_slot is None:
            anomalies.append({
                "date": metadata.date,
                "type": "UNEXPECTED_TIME",
                "severity": "MEDIUM",
                "message": f"Unexpected recording time detected: {metadata.recording_time}",
                "filename": metadata.filename,
            })

    return anomalies


if __name__ == "__main__":
    sample_files = [
        "202605190459_CLEAN.mp4",
        "202605191159_OA.mp4",
        "202605192044_CLEAN.mp4",
        "202605192233_CLEAN.mp4",
    ]

    from pprint import pprint
    pprint(detect_anomalies(sample_files))