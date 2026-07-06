export type DetailAnalysis = {
  edgeScore: number;
  detail: "Đơn giản" | "Trung bình" | "Phức tạp";
};

export function analyzeDetail(
  width: number,
  height: number,
  colorCount: number,
  logoCoverage: number
): DetailAnalysis {

  let score = 0;

  score += colorCount * 10;

  score += logoCoverage;

  const ratio = width / height;

  if (ratio > 2)
    score += 10;

  if (ratio < 0.7)
    score += 15;

  if (score > 100)
    score = 100;

  let detail: DetailAnalysis["detail"] = "Đơn giản";

  if (score > 35)
    detail = "Trung bình";

  if (score > 60)
    detail = "Phức tạp";

  return {
    edgeScore: score,
    detail,
  };
}