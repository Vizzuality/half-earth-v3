import { Range } from '../../types';
import { SPSData, SpeciesData } from '../types';

export type SPSLegendProps = {
  globalRangeSelected: Range;
  setGlobalRangeSelected: ({ min: number, max: number }: Range) => void;
  SPSSelected: Range;
  setSPSSelected: ({ min: number, max: number }: Range) => void;
  data: SPSData[];
  speciesData: SpeciesData[];
};
