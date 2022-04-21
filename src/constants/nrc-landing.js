import {
  LAND_SPI_VECTOR_TILE_LAYER,
  MARINE_SPI_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';

export const NRCLandingLayers = [
  {
    name: 'Land SPI (Global average: 45)',
    value: LAND_SPI_VECTOR_TILE_LAYER,
    id: LAND_SPI_VECTOR_TILE_LAYER,
    title: LAND_SPI_VECTOR_TILE_LAYER,
    slug: LAND_SPI_VECTOR_TILE_LAYER,
    metadataTitle: 'Land SPI'
  },
  {
    name: 'Marine SPI (Global average: 32)',
    value: MARINE_SPI_VECTOR_TILE_LAYER,
    id: MARINE_SPI_VECTOR_TILE_LAYER,
    title: MARINE_SPI_VECTOR_TILE_LAYER,
    slug: MARINE_SPI_VECTOR_TILE_LAYER,
    groupedLayer: true,
    metadataTitle: 'Marine SPI'

  }
];
