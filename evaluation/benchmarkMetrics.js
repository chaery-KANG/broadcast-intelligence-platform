export function calculateTemporalConsistency(day) {
  const expectedSlots = ["05", "12", "19", "21"];
  const detectedSlots = day.detectedSlots || [];

  const matched = expectedSlots.filter(slot => detectedSlots.includes(slot)).length;
  return Math.round((matched / expectedSlots.length) * 100);
}

export function calculateMissingSlotProbability(day) {
  const expectedSlots = ["05", "12", "19", "21"];
  const detectedSlots = day.detectedSlots || [];

  const missing = expectedSlots.filter(slot => !detectedSlots.includes(slot)).length;
  return Number((missing / expectedSlots.length).toFixed(2));
}

export function calculateFallbackDependency(day) {
  const fallbackCount = day.fallbackCount || 0;
  const totalFiles = day.totalFiles || 1;

  return Number((fallbackCount / totalFiles).toFixed(2));
}
