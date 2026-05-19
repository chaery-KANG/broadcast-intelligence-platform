from dataclasses import dataclass
from pathlib import Path
import re


@dataclass
class BroadcastFileMetadata:
    filename: str
    date: str
    recording_time: str
    normalized_slot: str | None
    version: str
    extension: str
    is_fallback: bool


EXPECTED_SLOTS = {
    "05:00": [459, 500, 501, 502],
    "12:00": [1159, 1200, 1201, 1202],
    "19:00": [1859, 1900, 1901, 1902],
    "21:00": [2059, 2100, 2101, 2102],
}

FALLBACK_SLOTS = {
    "21:00": [2044],
}


def normalize_slot(time_value: int) -> tuple[str | None, bool]:
    for slot, times in EXPECTED_SLOTS.items():
        if time_value in times:
            return slot, False

    for slot, times in FALLBACK_SLOTS.items():
        if time_value in times:
            return slot, True

    return None, False


def classify_version(filename: str) -> str:
    if "OA" in filename.upper():
        return "OA"
    return "CLEAN"


def parse_broadcast_filename(file_path: str) -> BroadcastFileMetadata:
    path = Path(file_path)
    filename = path.name
    extension = path.suffix.lower().replace(".", "")

    match = re.search(r"(20\d{6})(\d{4})", filename)

    if not match:
        raise ValueError(f"Cannot parse date/time from filename: {filename}")

    raw_date = match.group(1)
    raw_time = int(match.group(2))

    date = f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}"
    recording_time = f"{raw_time // 100:02d}:{raw_time % 100:02d}"

    normalized_slot, is_fallback = normalize_slot(raw_time)
    version = classify_version(filename)

    return BroadcastFileMetadata(
        filename=filename,
        date=date,
        recording_time=recording_time,
        normalized_slot=normalized_slot,
        version=version,
        extension=extension,
        is_fallback=is_fallback,
    )


if __name__ == "__main__":
    sample = "202605190459_CLEAN.mp4"
    metadata = parse_broadcast_filename(sample)
    print(metadata)