export type SPSData = {
  SPS_AOI: number;
  SPS_global: number;
  SliceNumber: number;
  per_global: number;
};

type IndividualSpeciesDataType = {
  SPS_AOI: number;
  SPS_global: number;
  SliceNumber: number;
  per_global: number;
  category: string;
  commonName: string | null;
  commonname: string;
  conservationConcern: number;
  globalProtectedArea: number;
  globalProtectedPercentage: number;
  globaldRangeArea: number;
  has_image: number;
  imageUrl: string;
  isFlagship: number;
  iucnCategory: string;
  molLink: string;
  name: string;
  protectionTarget: number;
  sliceNumber: number;
};

export type Range = {
  min: number;
  max: number;
};

export type SpeciesData = {
  category: string;
  commonName: string | string[];
  conservationConcern: number;
  globalProtectedArea: number;
  globalProtectedPercentage: number;
  globaldRangeArea: number;
  has_image: number;
  isFlagship: number;
  name: string;
  per_global: number;
  protectionTarget: number;
  sliceNumber: number;
};

export type SpeciesModalProps = {
  isOpen: boolean;
  handleModalClose: () => void;
  loading: boolean;
  cardProps: {
    SPSData: SPSData[];
    individualSpeciesData: IndividualSpeciesDataType;
    selectedSpeciesFilter: { label: string; slug: string };
  };
  speciesData: SpeciesData[];
  setSpecieBySliceNumber: (sliceNumber: number) => void;
};
