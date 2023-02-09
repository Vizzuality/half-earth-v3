export type SPSData = {
  SPS_aoi: number;
  SPS_global: number;
  SliceNumber: number;
  per_global: number;
};

type individualSpeciesData = {
  SPS_aoi: number;
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
  presenceInArea: number;
  protectionTarget: number;
  sliceNumber: number;
};

export type SpeciesModalProps = {
  isOpen: boolean;
  handleModalClose: () => void;
  loading: boolean;
  cardProps: {
    SPSData: SPSData[];
    individualSpeciesData: individualSpeciesData;
  };
};
