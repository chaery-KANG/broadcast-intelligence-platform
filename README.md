# Secure Broadcast Archive Intelligence Platform

A secure metadata-driven media archive analysis platform designed for NAS-based broadcast environments.

This project extracts structured metadata from unstructured broadcast filenames, analyzes archive coverage, detects anomalies, and provides a FastAPI-based reporting interface for secure internal media workflows.

---

## Features

- Broadcast filename metadata parsing
- Program slot normalization
- CLEAN / OA version classification
- Archive coverage analysis
- Missing slot detection
- Fallback recording detection
- Unexpected time anomaly detection
- JSON report export
- FastAPI REST API
- Secure NAS-oriented architecture

---

## Example Workflow

```txt
NAS / Media Folder
    ↓
Metadata Scanner
    ↓
Coverage Analysis
    ↓
Anomaly Detection
    ↓
JSON Report
    ↓
FastAPI API Server
```

---

## Example API

### GET `/report`

```json
{
  "detected_files": 4,
  "coverage": {
    "2026-05-19": {
      "coverage_score": 75
    }
  }
}
```

---

## Current Stack

### Backend
- Python
- FastAPI
- uv
- Pydantic

### Analysis
- Metadata Extraction
- Rule-based Slot Normalization
- Archive Integrity Monitoring

---

## Project Goals

- Secure NAS-based media archive management
- Broadcast metadata indexing
- Archive quality analysis
- Internal video preview system
- AI-powered media analysis extensions

---

## Future Roadmap

- React Dashboard
- SQLite / PostgreSQL integration
- Secure video streaming
- JWT authentication
- OCR-based subtitle extraction
- LLM-based news summarization
- Broadcast timeline visualization
- Docker deployment

---

## Example Detected Anomalies

- Missing required broadcast slot
- Fallback recording usage
- CLEAN/OA imbalance
- Unexpected recording time

---

## Research Direction

This project explores how unstructured broadcast archive environments can be transformed into structured metadata systems through automated parsing, archive integrity analysis, and secure media workflow design.