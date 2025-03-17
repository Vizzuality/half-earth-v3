import {
  SPSData,
  IndividualSpeciesDataType,
  Range,
  SpeciesData,
} from '../types';

export type SPSChartProps = {
  width: number;
  data: SPSData[];
  selectedSpecies: IndividualSpeciesDataType;
  SPSSelected: Range;
  globalRangeSelected: Range;
  speciesData: SpeciesData[];
  setSpecieById: (id: string) => void;
};
