import { SPSData } from '../types';

export type SPSLegendProps = {
  globalRangeSelected: { min: number; max: number };
  setGlobalRangeSelected: ({ min: number, max: number }) => void;
  SPSSelected: { min: number; max: number };
  setSPSSelected: ({ min: number, max: number }) => void;
  data: SPSData[];
};
