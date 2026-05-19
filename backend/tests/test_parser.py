from app.services.filename_parser import parse_broadcast_filename

samples = [
    "202605190459_CLEAN.mp4",
    "202605191159_OA.mp4",
    "202605192044_CLEAN.mp4",
    "202605192233_CLEAN.mp4",
]

for sample in samples:
    try:
        result = parse_broadcast_filename(sample)
        print(result)
    except Exception as e:
        print(f"ERROR: {sample} -> {e}")