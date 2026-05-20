# 🧠 NHK Media Archive AI Lab

> AI-powered media archive analysis & anomaly detection toolkit for broadcast workflows.

---

## ✨ Overview

This project is an experimental AI/archive-engineering workspace built around real-world media operations.

The goal is to:

* detect unusual archive patterns
* classify CLEAN / OA recordings automatically
* analyze missing broadcast slots
* visualize operational archive status
* build explainable anomaly scoring logic

Instead of a simple automation script, the project is evolving into a small research-style system combining:

* media engineering
* automation
* archive intelligence
* anomaly detection
* dashboard visualization

---

# 🖥️ Dashboard Preview

```txt
2026-05-18
CLEAN: 14
OA: 12
TOTAL: 26

✓ 05 slot detected
✓ 12 slot detected
⚠ 19 slot missing
✓ 21 slot detected

Archive Risk Score: 72/100
```

---

# 🔍 Core Features

## 📂 Automatic Archive Classification

* Detects CLEAN / OA recordings from filenames
* Parses broadcast timestamps automatically
* Supports NHK-style recording structures
* Handles duplicate and fallback recordings

---

## 🧠 Explainable Risk Scoring

The system calculates an archive risk score based on:

* missing time slots
* duplicate recordings
* irregular filename patterns
* fallback usage (2044 instead of 2059)
* unexpected gaps in daily archive flow

Unlike black-box AI scoring, every score can be explained.

---

## 📊 Daily Statistics Generator

Outputs:

| Date       | CLEAN | OA | TOTAL |
| ---------- | ----- | -- | ----- |
| 2026-05-18 | 14    | 12 | 26    |
| 2026-05-19 | 17    | 15 | 32    |

Additional checks:

* 05 / 12 / 19 / 21 slot validation
* fallback detection
* missing archive warnings

---

## ⚡ Smart File Processing

* skips existing files
* verifies file size after copy
* handles backup movement automatically
* removes duplicate AVI/MP4 combinations
* monthly auto-filter support

---

# 🧪 Research Direction

Current experimental topics:

* archive anomaly detection
* explainable AI for media operations
* temporal pattern analysis
* media workflow automation
* operational reliability scoring

Future ideas:

* ML-based anomaly prediction
* archive health forecasting
* real-time dashboard alerts
* OCR subtitle extraction
* multimodal archive indexing

---

# 🛠️ Tech Stack

| Area            | Stack                     |
| --------------- | ------------------------- |
| Language        | Python / JavaScript       |
| Visualization   | HTML / React              |
| Data Processing | Pandas                    |
| Automation      | PowerShell / Python       |
| Environment     | Windows / Network Storage |

---

# 📁 Example Structure

```txt
project/
 ├─ src/
 │   ├─ archiveRiskScorer.js
 │   ├─ parser.py
 │   └─ analyzer.py
 │
 ├─ dashboard/
 │   └─ index.html
 │
 ├─ docs/
 │   └─ research-note.md
 │
 └─ README.md
```

---

# 🚀 Philosophy

This repository is not just a storage space for scripts.

It is an evolving engineering notebook documenting:

* operational problems
* automation attempts
* AI experimentation
* iterative improvement
* research-oriented thinking

---

# 🌸 Author Notes

Built while working with:

* media archive workflows
* Japanese broadcasting environments
* real operational recording systems
* cross-language engineering tasks

Focused on practical engineering rather than theoretical-only AI.

---

# 📌 Status

🟢 Active Development

The project is continuously updated with:

* new anomaly logic
* archive analysis features
* visualization improvements
* automation experiments

---

# ⭐ Future Vision

Long-term goal:

> Build an intelligent media archive assistant capable of understanding, validating, and monitoring broadcast recording environments automatically.
