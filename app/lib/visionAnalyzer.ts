export type VisionAnalysis = {
  objectCount: number;
  textRatio: number;
  fillRatio: number;
  outlineRatio: number;
  complexity: number;
};

export function analyzeVision(
  width: number,
  height: number,
  colorCount: number,
  coverage: number,
  detail: number
): VisionAnalysis {
  let objectCount = 1;

  if (detail > 30) objectCount++;
  if (detail > 60) objectCount++;
  if (colorCount > 3) objectCount++;

  let textRatio = 40;

  if (width / height > 2) textRatio = 75;
  if (coverage > 40) textRatio -= 20;

  textRatio = Math.max(10, Math.min(90, textRatio));

  const fillRatio = coverage;
  const outlineRatio = 100 - fillRatio;

  const complexity = detail * 0.4 + colorCount * 8 + objectCount * 5;

  return {
    objectCount,
    textRatio,
    fillRatio,
    outlineRatio,
    complexity: Math.round(complexity),
  };
}