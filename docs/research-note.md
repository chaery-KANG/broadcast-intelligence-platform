# Research Note: Broadcast Archive Anomaly Detection

## Problem

Broadcast archive folders can contain hundreds of monthly video files. Operators need to quickly confirm whether important recording slots exist for both `CLEAN` and `OA` versions.

The main problem is not just file counting. The system should understand operational context:

- A 04:59 recording may correspond to the 05:00 broadcast.
- A 20:44 recording may be a fallback for a missing 21:00 file.
- A date may look complete by total count but still miss a key slot.

## Current approach

The current implementation uses rule-based anomaly detection.

This was chosen because:

1. The rules are explainable.
2. The workflow can be validated with real archive operators.
3. The output can later become labeled training data for ML models.

## Candidate ML extension

Once enough monthly data is collected, the project can move toward anomaly detection using historical patterns.

Recommended first model:

- Isolation Forest

Recommended features:

- CLEAN count
- OA count
- Total count
- Missing CLEAN slots
- Missing OA slots
- Fallback slot count
- Unrecognized filename count
- Weekday / weekend flag

## Portfolio value

This project is useful for an AI graduate-school portfolio because it connects:

- Real workflow pain point
- Data parsing
- Operational anomaly detection
- Explainable scoring
- Dashboard visualization
- Future ML extension
