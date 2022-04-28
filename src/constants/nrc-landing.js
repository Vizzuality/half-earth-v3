import {
  GLOBAL_SPI_FEATURE_LAYER,
  MARINE_SPI_FEATURE_LAYER
} from 'constants/layers-slugs';

export const NRCLandingLayers = [
  {
    name: 'Land SPI (Global average: 45)', // TO DO:
    value: GLOBAL_SPI_FEATURE_LAYER,
    id: GLOBAL_SPI_FEATURE_LAYER,
    title: GLOBAL_SPI_FEATURE_LAYER,
    slug: GLOBAL_SPI_FEATURE_LAYER, // TO DO: cambiar a slug específico de metadata
    metadataTitle: 'Land SPI'
  },
  {
    name: 'Marine SPI (Global average: 32)', // TO DO:
    value: MARINE_SPI_FEATURE_LAYER,
    id: MARINE_SPI_FEATURE_LAYER,
    title: MARINE_SPI_FEATURE_LAYER,
    slug: MARINE_SPI_FEATURE_LAYER, // TO DO: cambiar a slug específico de metadata
    metadataTitle: 'Marine SPI'
  }
];
