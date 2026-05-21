import {
  calculateTemporalConsistency,
  calculateMissingSlotProbability,
  calculateFallbackDependency
} from "./benchmarkMetrics.js";

export function calculateArchiveHealthScore(day) {
  const temporalConsistency = calculateTemporalConsistency(day);
  const missingSlotProbability = calculateMissingSlotProbability(day);
  const fallbackDependency = calculateFallbackDependency(day);

  const score =
    temporalConsistency
    - missingSlotProbability * 30
    - fallbackDependency * 20;

  return {
    date: day.date,
    archiveHealthScore: Math.max(0, Math.round(score)),
    temporalConsistency,
    missingSlotProbability,
    fallbackDependency,
    stabilityLevel:
      score >= 85 ? "HIGH" :
      score >= 65 ? "MEDIUM" :
      "LOW"
  };
}
