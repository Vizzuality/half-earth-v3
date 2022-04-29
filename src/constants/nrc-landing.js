import {
  GLOBAL_SPI_FEATURE_LAYER,
  MARINE_SPI_FEATURE_LAYER
} from 'constants/layers-slugs';

export const NRCLandingLayers = [
  {
    name: 'Land',
    value: GLOBAL_SPI_FEATURE_LAYER,
    id: GLOBAL_SPI_FEATURE_LAYER,
    title: GLOBAL_SPI_FEATURE_LAYER,
    slug: GLOBAL_SPI_FEATURE_LAYER, //TODO: change specific slug for metadata
    metadataTitle: 'Land SPI'
  },
  {
    name: 'Marine',
    value: MARINE_SPI_FEATURE_LAYER,
    id: MARINE_SPI_FEATURE_LAYER,
    title: MARINE_SPI_FEATURE_LAYER,
    slug: MARINE_SPI_FEATURE_LAYER, //TODO: change specific slug for metadata
    metadataTitle: 'Marine SPI'
  }
];
