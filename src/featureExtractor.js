const EXPECTED_SLOTS = ['05', '12', '19', '21'];

function boolToInt(value) {
  return value ? 1 : 0;
}

function countMissingSlots(slots = {}) {
  return EXPECTED_SLOTS.reduce((count, slot) => count + (slots[slot] ? 0 : 1), 0);
}

function countActiveSlots(slots = {}) {
  return EXPECTED_SLOTS.reduce((count, slot) => count + boolToInt(slots[slot]), 0);
}

function getWeekendFlag(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 0;
  const day = date.getDay();
  return day === 0 || day === 6 ? 1 : 0;
}

/**
 * Converts one archive-day summary into an ML-friendly feature vector.
 * This keeps the AI pipeline separate from raw filename parsing.
 */
export function extractArchiveFeatures(daySummary) {
  const cleanSlots = daySummary.cleanSlots || {};
  const oaSlots = daySummary.oaSlots || {};
  const fallbackSlots = daySummary.fallbackSlots || {};

  const cleanMissing = countMissingSlots(cleanSlots);
  const oaMissing = countMissingSlots(oaSlots);
  const fallbackCount = countActiveSlots(fallbackSlots);
  const total = daySummary.total || 0;
  const cleanCount = daySummary.cleanCount || 0;
  const oaCount = daySummary.oaCount || 0;

  return {
    date: daySummary.date,
    vector: [
      cleanCount,
      oaCount,
      total,
      cleanMissing,
      oaMissing,
      fallbackCount,
      daySummary.unrecognizedCount || 0,
      getWeekendFlag(daySummary.date),
      total === 0 ? 1 : cleanCount / total,
      total === 0 ? 1 : oaCount / total,
    ],
    featureNames: [
      'clean_count',
      'oa_count',
      'total_count',
      'missing_clean_slots',
      'missing_oa_slots',
      'fallback_slot_count',
      'unrecognized_filename_count',
      'is_weekend',
      'clean_ratio',
      'oa_ratio',
    ],
  };
}

export function extractFeatureMatrix(monthlyRows) {
  return monthlyRows.map(extractArchiveFeatures);
}
