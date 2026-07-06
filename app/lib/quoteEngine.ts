export type QuoteInput = {
  widthMm: number;
  quantity: number;
  colorCount?: number;
  complexity?: "low" | "medium" | "high";
};

export type QuoteResult = {
  estimatedStitches: number;
  unitPrice: number;
  revenue: number;
  directCost: number;
  grossProfit: number;
  grossMargin: number;
};

export function vnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export function estimateStitches(input: QuoteInput) {
  const width = Number(input.widthMm || 0);
  const colorCount = input.colorCount || 1;

  const complexityFactor =
    input.complexity === "high" ? 1.55 : input.complexity === "low" ? 0.82 : 1;

  const colorFactor = colorCount <= 1 ? 1 : 1 + (colorCount - 1) * 0.06;

  return Math.max(500, Math.round(width * 45 * complexityFactor * colorFactor));
}

export function priceByStitches(stitches: number) {
  if (stitches <= 2000) return 12000;
  if (stitches <= 4000) return 18000;
  if (stitches <= 7000) return 25000;
  if (stitches <= 10000) return 35000;
  return 50000;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const estimatedStitches = estimateStitches(input);
  const unitPrice = priceByStitches(estimatedStitches);
  const quantity = Number(input.quantity || 1);

  const revenue = unitPrice * quantity;
  const directCost = Math.round(revenue * 0.42);
  const grossProfit = revenue - directCost;
  const grossMargin =
    revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;

  return {
    estimatedStitches,
    unitPrice,
    revenue,
    directCost,
    grossProfit,
    grossMargin,
  };
}