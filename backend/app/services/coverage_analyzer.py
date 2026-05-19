from collections import defaultdict
from app.services.filename_parser import parse_broadcast_filename

REQUIRED_SLOTS = ["05:00", "12:00", "19:00", "21:00"]


def analyze_coverage(file_list: list[str]):
    grouped = defaultdict(list)

    for file_name in file_list:
        metadata = parse_broadcast_filename(file_name)
        grouped[metadata.date].append(metadata)

    results = {}

    for date, items in grouped.items():
        clean_count = sum(1 for x in items if x.version == "CLEAN")
        oa_count = sum(1 for x in items if x.version == "OA")

        detected_slots = set(
            x.normalized_slot
            for x in items
            if x.normalized_slot is not None
        )

        missing_slots = [
            slot for slot in REQUIRED_SLOTS
            if slot not in detected_slots
        ]

        fallback_used = any(x.is_fallback for x in items)

        coverage_score = int(
            (len(detected_slots) / len(REQUIRED_SLOTS)) * 100
        )

        results[date] = {
            "clean_count": clean_count,
            "oa_count": oa_count,
            "missing_slots": missing_slots,
            "fallback_used": fallback_used,
            "coverage_score": coverage_score,
        }

    return results


if __name__ == "__main__":
    sample_files = [
        "202605190459_CLEAN.mp4",
        "202605191159_OA.mp4",
        "202605192044_CLEAN.mp4",
    ]

    result = analyze_coverage(sample_files)

    from pprint import pprint
    pprint(result)