export type ShapeAnalysis = {
  shape: "round" | "square" | "horizontal" | "vertical";
  factor: number;
};

export function analyzeShape(width: number, height: number): ShapeAnalysis {
  const ratio = width / height;

  if (ratio > 2.5) {
    return {
      shape: "horizontal",
      factor: 0.92,
    };
  }

  if (ratio < 0.65) {
    return {
      shape: "vertical",
      factor: 1.08,
    };
  }

  if (ratio > 0.85 && ratio < 1.15) {
    return {
      shape: "round",
      factor: 1.12,
    };
  }

  return {
    shape: "square",
    factor: 1,
  };
}