# Model Card: Temporal Broadcast Anomaly Detector

## Purpose

This module detects suspicious daily archive patterns in broadcast recording folders.

It is designed for early-stage AI research and portfolio development, not for fully automated operational decisions.

## Input

Daily archive summaries containing:

- CLEAN file count
- OA file count
- total file count
- expected time-slot coverage
- fallback slot usage
- unrecognized filename count
- date metadata

## Feature Vector

| Feature | Meaning |
|---|---|
| clean_count | Number of CLEAN files for the day |
| oa_count | Number of OA files for the day |
| total_count | Total archive files |
| missing_clean_slots | Number of missing CLEAN target slots |
| missing_oa_slots | Number of missing OA target slots |
| fallback_slot_count | Number of fallback recordings used |
| unrecognized_filename_count | Filename parse failures |
| is_weekend | Weekend flag |
| clean_ratio | CLEAN / total ratio |
| oa_ratio | OA / total ratio |

## Current Method

The current detector uses z-score based temporal deviation from the monthly baseline.

This is intentionally interpretable:

- every anomaly has a reason
- every feature can be inspected
- output can become labeled data for later ML models

## Future ML Upgrade

Candidate models:

- Isolation Forest
- One-Class SVM
- LSTM autoencoder
- Tabular autoencoder

## Limitations

- Small datasets may produce unstable baselines
- Rule-based and statistical scoring cannot understand all production context
- Human review is still required before operational use
