const EXPECTED_SLOTS = ['05', '12', '19', '21'];

/**
 * Calculates a transparent anomaly score for one broadcast archive day.
 * The score is intentionally rule-based so the reason for each alert is explainable.
 */
export function scoreArchiveDay(daySummary) {
  let score = 0;
  const reasons = [];

  if (!daySummary || daySummary.total === 0) {
    return {
      score: 50,
      level: 'high',
      reasons: ['No broadcast files were detected for this date.'],
    };
  }

  for (const slot of EXPECTED_SLOTS) {
    if (!daySummary.cleanSlots?.[slot]) {
      score += 20;
      reasons.push(`Missing CLEAN recording for ${slot}:00 slot.`);
    }

    if (!daySummary.oaSlots?.[slot]) {
      score += 20;
      reasons.push(`Missing OA recording for ${slot}:00 slot.`);
    }

    if (daySummary.fallbackSlots?.[slot]) {
      score += 5;
      reasons.push(`Fallback recording was used for ${slot}:00 slot.`);
    }
  }

  if (daySummary.unrecognizedCount > 0) {
    score += daySummary.unrecognizedCount * 10;
    reasons.push(`${daySummary.unrecognizedCount} filename(s) could not be parsed.`);
  }

  return {
    score,
    level: score >= 50 ? 'high' : score >= 20 ? 'medium' : 'low',
    reasons,
  };
}

export function attachRiskScores(monthlyRows) {
  return monthlyRows.map((row) => ({
    ...row,
    risk: scoreArchiveDay(row),
  }));
}
