export type LogoType =
  | "text"
  | "icon"
  | "badge"
  | "mixed";

export type LogoClassifyResult = {
  type: LogoType;
  factor: number;
  description: string;
};

export function classifyLogo(
  ratio: number,
  colorCount: number,
  coverage: number
): LogoClassifyResult {

  // Logo chữ
  if (ratio > 2.3 && coverage < 30) {
    return {
      type: "text",
      factor: 0.9,
      description: "Logo chủ yếu là chữ",
    };
  }

  // Badge
  if (coverage > 55) {
    return {
      type: "badge",
      factor: 1.2,
      description: "Logo dạng huy hiệu",
    };
  }

  // Icon
  if (ratio < 1.2 && colorCount <= 2) {
    return {
      type: "icon",
      factor: 1.05,
      description: "Logo biểu tượng",
    };
  }

  // Mixed
  return {
    type: "mixed",
    factor: 1.1,
    description: "Logo chữ + biểu tượng",
  };
}