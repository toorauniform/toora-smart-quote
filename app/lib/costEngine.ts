import { costProfile } from "./costProfile";

export type CostResult = {
  threadCost: number;
  electricityCost: number;
  laborCost: number;
  machineCost: number;
  needleCost: number;
  backingCost: number;
  packingCost: number;
  totalCost: number;
  suggestedPrice: number;
  profit: number;
  profitMargin: number;
};

export function calculateCost(
  stitches: number,
  machineTimeMinutes: number
): CostResult {
  const threadCost =
    (stitches / 1000) * costProfile.threadCostPer1000Stitches;

  const electricityCost =
    (machineTimeMinutes / 60) *
    costProfile.machinePowerKw *
    costProfile.electricityPricePerKwh;

  const laborCost =
    (machineTimeMinutes / 60) * costProfile.laborCostPerHour;

  const machineCost =
    (machineTimeMinutes / 60) * costProfile.machineDepreciationPerHour;

  const needleCost = costProfile.needleCostPerPiece;
  const backingCost = costProfile.backingCostPerPiece;
  const packingCost = costProfile.packingCostPerPiece;

  const totalCost =
    threadCost +
    electricityCost +
    laborCost +
    machineCost +
    needleCost +
    backingCost +
    packingCost;

  const suggestedPrice =
    totalCost / (1 - costProfile.targetMarginPercent / 100);

  const profit = suggestedPrice - totalCost;
  const profitMargin = (profit / suggestedPrice) * 100;

  return {
    threadCost: Math.round(threadCost),
    electricityCost: Math.round(electricityCost),
    laborCost: Math.round(laborCost),
    machineCost: Math.round(machineCost),
    needleCost,
    backingCost,
    packingCost,
    totalCost: Math.round(totalCost),
    suggestedPrice: Math.round(suggestedPrice),
    profit: Math.round(profit),
    profitMargin: Math.round(profitMargin),
  };
}