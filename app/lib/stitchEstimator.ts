export interface StitchEstimate {
  estimatedStitches: number;
  difficulty: "low" | "medium" | "high";
  satinStitches: number;
  fillStitches: number;
  runningStitches: number;
}

export function estimateStitches(
  widthMM: number,
  colorCount: number,
  logoCoverage: number,
  detailScore: number,
  shapeFactor: number = 1,
  strokeFactor: number = 1,
  visionScore: number = 40
): StitchEstimate {
  const safeWidth = Math.max(1, widthMM);
  const coverage = Math.max(5, Math.min(95, logoCoverage));
  const detail = Math.max(0, Math.min(100, detailScore));
  const vision = Math.max(0, Math.min(100, visionScore));

  const satinRatio = Math.max(15, Math.min(65, 55 - coverage * 0.35 + detail * 0.15));
  const fillRatio = Math.max(10, Math.min(70, coverage * 0.9 + vision * 0.15));
  const runningRatio = Math.max(8, 100 - satinRatio - fillRatio);

  const satinStitches = Math.round(safeWidth * satinRatio * 1.15);
  const fillStitches = Math.round(safeWidth * coverage * 2.15);
  const runningStitches = Math.round(safeWidth * runningRatio * 0.85);

  let stitches =
    (satinStitches + fillStitches + runningStitches) *
    (1 + colorCount * 0.04) *
    shapeFactor *
    strokeFactor *
    (1 + vision / 350);

  stitches = Math.max(700, stitches);

  let difficulty: "low" | "medium" | "high" = "low";
  if (stitches > 5000) difficulty = "medium";
  if (stitches > 9000) difficulty = "high";

  return {
    estimatedStitches: Math.round(stitches),
    difficulty,
    satinStitches,
    fillStitches,
    runningStitches,
  };
}