import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';

import { DASHBOARD_LAYER_SLUGS } from 'constants/dashboard-constants';
import { DASHBOARD_URLS } from 'constants/layers-urls';

export const tutorialSections = {
  SPECIES: 'species',
  DATA_LAYERS: 'data-layers',
  INDICATOR_SCORES: 'indicator-scores',
  REGIONS: 'regions',
  INDICATORS: 'indicators',
  SPI: 'spi',
  SHI: 'shi',
  SII: 'sii',
};

export const IUCNStatusTypes = {
  CE: 'Critically Endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near Threatened',
  LC: 'Least Concern',
  DD: 'Data Deficient',
};

export const PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID =
  'e3dca98a5bf74c9898c30f72baf6b1ba';
export const PROVINCE_FEATURE_GLOBAL_OUTLINE_ID =
  'c6bc2248f053422da9d8d30ce591ca16';

// DRC LAYERS
export const PROTECTED_AREA_FEATURE_URL = '6b13aac7863a44bb915d1847dfc5dfd9';
export const SHI_LAYER_ID = '41981d576d6042aea14595de0fb924f2';
export const DRC_REGION_FEATURE_ID = '95cac457c0244a2286d914148c24af98';
export const EXPERT_RANGE_MAP_URL =
  'https://next-api-dot-map-of-life.appspot.com/2.x/species/drc_rangemap';
export const TREND_MAP_URL =
  'https://next-api-dot-map-of-life.appspot.com/2.x/species/drc_trend';

// LIBERIA LAYERS
export const PROTECTED_AREA_LIB_FEATURE_URL =
  'db67d0fa645047a18d83c1c5a67e9d99';

// GUINEA LAYERS
export const PROTECTED_AREA_GIN_FEATURE_URL =
  'fd86210b977c4ec3935f297559dcd80b';

// SIERRA LEONE
export const PROTECTED_AREA_SLE_FEATURE_URL =
  'af483c5930f9447080c9e49f8698882d';

// GUYANA
export const PROTECTED_AREA_GUY_FEATURE_URL =
  'd610d9ad96bc4071a31b3aacdfbf844d';

export const GBIF_OCCURENCE_URL = 'fa37779380764f939a4747e92b3d3fb2';

export const DASHBOARD_TABLE_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ESRI_table1/FeatureServer';

// temporary for DRC demo
export const SPECIES_LAYER_IDS = {
  Myotis_bocagii: 'c41c9e06c2284b44be9fc41d144e63ba',
  Hyperolius_castaneus: 'a8d710cd5a5f4124b90ff189cdcdfeba',
  Chiromantis_rufescens: 'eb1019801a8b44bebd98e0452ef20132',
};

export const createDefaultDashboardLayers = () => {
  const countries = new FeatureLayer({
    portalItem: {
      id: DASHBOARD_URLS.INITIAL_COUNTRY_LAYER,
    },
    id: DASHBOARD_LAYER_SLUGS.INITIAL_COUNTRY_LAYER,
  });

  const graphics = new GraphicsLayer({
    blendMode: 'destination-in',
    title: 'layer',
  });

  const tileLayer = new TileLayer({
    portalItem: {
      // bottom layer in the group layer
      id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
    },
  });

  const group = new GroupLayer({
    id: DASHBOARD_LAYER_SLUGS.INITIAL_GROUP_LAYER,
    layers: [
      tileLayer,
      // world imagery layer will show where it overlaps with the graphicslayer
      graphics,
    ],
    opacity: 0, // initially this layer will be transparent
  });

  return {
    countries,
    graphics,
    group,
  };
};

export function numberToLocaleStringWithOneDecimal(number, fractionDigits = 1) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
