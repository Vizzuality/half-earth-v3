export type SPSLegendProps = {
  width: number;
  height: number;
  globalRangeSelected: () => void;
  setGlobalRangeSelected: () => void;
  SPSSelected: { min: number, max: number };
  setSPSSelected: { min: number, max: number };
};
