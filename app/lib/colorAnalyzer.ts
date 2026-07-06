export interface ColorAnalysis {
  colorCount: number;
  dominantColor: string;
  complexity: "Đơn giản" | "Trung bình" | "Phức tạp";
}

export function analyzeImage(
  width: number,
  height: number
): ColorAnalysis {

  const ratio = width / height;

  let colorCount = 2;

  if (ratio > 2) colorCount = 3;
  if (ratio > 3) colorCount = 4;

  let complexity: ColorAnalysis["complexity"] = "Đơn giản";

  const area = width * height;

  if (area > 500000)
    complexity = "Trung bình";

  if (area > 1200000)
    complexity = "Phức tạp";

  return {
    colorCount,
    dominantColor: "Chưa xác định",
    complexity,
  };
}