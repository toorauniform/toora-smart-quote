export interface StitchEstimate {
  estimatedStitches: number;
  difficulty: "low" | "medium" | "high";
}

export function estimateStitches(
  widthMM: number,
  colorCount: number,
  logoCoverage: number,
  detailScore: number
): StitchEstimate {

  // Diện tích thêu ước tính
  let stitches = widthMM * 45;

  // Độ phủ logo
  stitches *= 1 + logoCoverage / 100;

  // Số màu
  stitches *= 1 + colorCount * 0.05;

  // Chi tiết
  stitches *= 1 + detailScore / 120;

  let difficulty: "low" | "medium" | "high" = "low";

  if (stitches > 5000)
    difficulty = "medium";

  if (stitches > 9000)
    difficulty = "high";

  return {
    estimatedStitches: Math.round(stitches),
    difficulty,
  };
}