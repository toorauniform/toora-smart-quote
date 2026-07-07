export type StrokeAnalysis = {
  strokeScore: number;
  stroke: "thin" | "medium" | "thick";
  factor: number;
};

export function analyzeStroke(
  width: number,
  height: number,
  coverage: number,
  detail: number
): StrokeAnalysis {

  const density =
    (coverage * 0.7) +
    (detail * 0.3);

  if (density < 20) {
    return {
      strokeScore: 80,
      stroke: "thick",
      factor: 0.88,
    };
  }

  if (density < 40) {
    return {
      strokeScore: 55,
      stroke: "medium",
      factor: 1,
    };
  }

  return {
    strokeScore: 25,
    stroke: "thin",
    factor: 1.18,
  };
}