import { SPSData, IndividualSpeciesDataType, Range } from '../types.d';

export type SPSChartProps = {
  width: number;
  data: SPSData[];
  selectedSpecies: IndividualSpeciesDataType;
  SPSSelected: Range;
  globalRangeSelected: Range;
};
