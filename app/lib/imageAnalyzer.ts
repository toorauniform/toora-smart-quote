export type ImageAnalysis = {
  width: number;
  height: number;
  logoCoverage: number; // %
};

export function analyzeImageCoverage(
  width: number,
  height: number
): ImageAnalysis {
  // Tạm thời giả lập AI
  // Sau này sẽ thay bằng OpenCV hoặc TensorFlow

  const area = width * height;

  let logoCoverage = 20;

  if (area > 1000000) {
    logoCoverage = 18;
  }

  if (area > 2000000) {
    logoCoverage = 15;
  }

  return {
    width,
    height,
    logoCoverage,
  };
}