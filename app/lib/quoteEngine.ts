import { estimateStitches as aiEstimateStitches } from "./stitchEstimator";

export type QuoteInput = {
  widthMm: number;
  quantity: number;
  colorCount?: number;
  logoCoverage?: number;
  detailScore?: number;
};

export type QuoteResult = {
  estimatedStitches: number;
  difficulty: "low" | "medium" | "high";
  unitPrice: number;
  revenue: number;
  directCost: number;
  grossProfit: number;
  grossMargin: number;
};

export function vnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export function priceByStitches(stitches: number) {
  if (stitches <= 2000) return 12000;
  if (stitches <= 4000) return 18000;
  if (stitches <= 7000) return 25000;
  if (stitches <= 10000) return 35000;
  return 50000;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const stitchResult = aiEstimateStitches(
    Number(input.widthMm || 0),
    input.colorCount || 1,
    input.logoCoverage || 20,
    input.detailScore || 30
  );

  const estimatedStitches = Math.max(500, stitchResult.estimatedStitches);
  const unitPrice = priceByStitches(estimatedStitches);
  const quantity = Number(input.quantity || 1);

  const revenue = unitPrice * quantity;
  const directCost = Math.round(revenue * 0.42);
  const grossProfit = revenue - directCost;
  const grossMargin =
    revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;

  return {
    estimatedStitches,
    difficulty: stitchResult.difficulty,
    unitPrice,
    revenue,
    directCost,
    grossProfit,
    grossMargin,
  };
}