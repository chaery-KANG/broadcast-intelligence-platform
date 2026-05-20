import { extractArchiveFeatures } from './featureExtractor.js';

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  const avg = mean(values);
  const variance = mean(values.map((value) => (value - avg) ** 2));
  return Math.sqrt(variance) || 1;
}

function zScore(value, avg, std) {
  return Math.abs((value - avg) / std);
}

/**
 * Lightweight temporal anomaly detector.
 *
 * It compares each day against the monthly baseline using normalized deviation.
 * This is intentionally simple and explainable before replacing it with
 * Isolation Forest / One-Class SVM / Autoencoder experiments later.
 */
export function detectTemporalAnomalies(monthlyRows, threshold = 2.0) {
  const featureRows = monthlyRows.map(extractArchiveFeatures);
  if (featureRows.length < 3) {
    return featureRows.map((row) => ({
      date: row.date,
      anomalyScore: 0,
      isAnomaly: false,
      reasons: ['Not enough historical rows to calculate temporal baseline.'],
    }));
  }

  const matrix = featureRows.map((row) => row.vector);
  const featureNames = featureRows[0].featureNames;

  const stats = featureNames.map((_, index) => {
    const column = matrix.map((row) => row[index]);
    return {
      mean: mean(column),
      std: standardDeviation(column),
    };
  });

  return featureRows.map((row) => {
    const deviations = row.vector.map((value, index) => ({
      feature: featureNames[index],
      deviation: zScore(value, stats[index].mean, stats[index].std),
      value,
      baseline: Number(stats[index].mean.toFixed(2)),
    }));

    const topReasons = deviations
      .filter((item) => item.deviation >= threshold)
      .sort((a, b) => b.deviation - a.deviation)
      .slice(0, 3)
      .map((item) => `${item.feature}=${item.value} differs from baseline ${item.baseline}`);

    const anomalyScore = deviations.reduce((sum, item) => sum + item.deviation, 0) / deviations.length;

    return {
      date: row.date,
      anomalyScore: Number(anomalyScore.toFixed(3)),
      isAnomaly: topReasons.length > 0,
      reasons: topReasons.length ? topReasons : ['No strong temporal anomaly detected.'],
    };
  });
}
