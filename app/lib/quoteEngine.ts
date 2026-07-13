import { estimateStitches as aiEstimateStitches } from "./stitchEstimator";
import { estimateMachine, type MachineEstimate } from "./machineEstimator";
import { calculateCost, type CostResult } from "./costEngine";

export type QuoteInput = {
  widthMm: number;
  quantity: number;
  colorCount?: number;
  logoCoverage?: number;
  detailScore?: number;
  shapeFactor?: number;
  strokeFactor?: number;
  visionScore?: number;
};

export type QuoteResult = {
  estimatedStitches: number;
  difficulty: "low" | "medium" | "high";
  satinStitches: number;
  fillStitches: number;
  runningStitches: number;
  machine: MachineEstimate;
  cost: CostResult;
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
  if (stitches <= 1500) return 12000;
  if (stitches <= 3000) return 15000;
  if (stitches <= 5000) return 18000;
  if (stitches <= 7000) return 25000;
  if (stitches <= 10000) return 35000;
  return 50000;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const stitchResult = aiEstimateStitches(
    Number(input.widthMm || 0),
    input.colorCount || 1,
    input.logoCoverage || 20,
    input.detailScore || 30,
    input.shapeFactor || 1,
    input.strokeFactor || 1,
    input.visionScore || 40
  );

  const estimatedStitches = Math.max(700, stitchResult.estimatedStitches);

  const satinStitches =
    stitchResult.satinStitches ?? Math.round(estimatedStitches * 0.35);

  const fillStitches =
    stitchResult.fillStitches ?? Math.round(estimatedStitches * 0.5);

  const runningStitches =
    stitchResult.runningStitches ?? Math.round(estimatedStitches * 0.15);

  const machine = estimateMachine(
    satinStitches,
    fillStitches,
    runningStitches,
    input.colorCount || 1,
    input.detailScore || 30
  );

  const cost = calculateCost(estimatedStitches, machine.totalTime);

  const unitPrice = Math.max(
    priceByStitches(estimatedStitches),
    cost.suggestedPrice
  );

  const quantity = Number(input.quantity || 1);
  const revenue = unitPrice * quantity;
  const directCost = cost.totalCost * quantity;
  const grossProfit = revenue - directCost;
  const grossMargin =
    revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;

  return {
    estimatedStitches,
    difficulty: stitchResult.difficulty,
    satinStitches,
    fillStitches,
    runningStitches,
    machine,
    cost,
    unitPrice,
    revenue,
    directCost,
    grossProfit,
    grossMargin,
  };
}