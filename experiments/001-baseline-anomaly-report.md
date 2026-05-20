# Experiment 001: Baseline Temporal Anomaly Detection

## Objective

Create a first AI-oriented baseline that can identify abnormal archive days from daily recording summaries.

## Hypothesis

A day with missing key slots, unusually low total count, or many filename parsing failures should deviate from the monthly baseline.

## Method

1. Convert each day into a feature vector.
2. Calculate monthly mean and standard deviation for each feature.
3. Compare each day against the baseline using z-score deviation.
4. Return anomaly explanations using the most abnormal features.

## Why this matters

This creates a bridge from operational automation to AI research:

- raw files become structured metadata
- metadata becomes feature vectors
- feature vectors become anomaly scores
- anomaly scores become explainable review targets

## Next Experiment

Train an Isolation Forest model using several months of archive data and compare it with this explainable statistical baseline.
