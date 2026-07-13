export type MachineEstimate = {
  satinTime: number;
  fillTime: number;
  runningTime: number;
  stitchTime: number;
  colorChangeCount: number;
  colorChangeTime: number;
  trimCount: number;
  trimTime: number;
  finishingTime: number;
  totalTime: number;
};

export const estimateMachine = (
  satinStitches: number,
  fillStitches: number,
  runningStitches: number,
  colorCount: number,
  detailScore: number
): MachineEstimate => {
  const satinSpeed = 900;
  const fillSpeed = 650;
  const runningSpeed = 1100;

  const satinTime = satinStitches / satinSpeed;
  const fillTime = fillStitches / fillSpeed;
  const runningTime = runningStitches / runningSpeed;

  const stitchTime = satinTime + fillTime + runningTime;

  const colorChangeCount = Math.max(0, colorCount - 1);
  const colorChangeTime = colorChangeCount * 0.4;

  const trimCount = Math.max(1, Math.round(detailScore / 2));
  const trimTime = trimCount * 0.06;

  const finishingTime = 1.5;
  const totalTime = stitchTime + colorChangeTime + trimTime + finishingTime;

  return {
    satinTime,
    fillTime,
    runningTime,
    stitchTime,
    colorChangeCount,
    colorChangeTime,
    trimCount,
    trimTime,
    finishingTime,
    totalTime,
  };
};