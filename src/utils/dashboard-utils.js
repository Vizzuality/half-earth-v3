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
  EX: 'Extinct',
  EW: 'Extinct in the wild',
  CR: 'Critically Endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near Threatened',
  LC: 'Least Concern',
  DD: 'Data Deficient',
  NE: 'Not evaluated',
  UN: 'Unknown',
};

export const PROVINCE_FEATURE_GLOBAL_SPI_LAYER_ID =
  'a2adcca9c4a4425582e29fb413df6a72'; // 'e3dca98a5bf74c9898c30f72baf6b1ba';
export const PROVINCE_FEATURE_GLOBAL_OUTLINE_ID =
  'c6bc2248f053422da9d8d30ce591ca16';

// DRC LAYERS
export const PROTECTED_AREA_FEATURE_URL = '175c41cfa552401c83d07201732c303f';
// Yale AGOL - 36370bcf99884301bca92ea8eb91f78f
// DRC SPI LAYER = '41981d576d6042aea14595de0fb924f2';
export const SHI_LAYER_ID = '6f02cce2565b4d089565aaed6adb6ca2';
// Yale AGOL - c0a78b5a9b4e4758b4b8f5fcee76412a
export const DRC_REGION_FEATURE_ID = 'b0109ce737f4495aa188826ef0601816'; // '95cac457c0244a2286d914148c24af98';
// Yale AGOL - b0109ce737f4495aa188826ef0601816

export const ZONE_5_SPI_FEATURE_ID = '904167199e2d4fe59a57b0c4c2e51ec7';
export const ZONE_5_SHI_FEATURE_ID = 'c3a05367565e43feba045d5034152139';
export const ZONE_3_SPI_FEATURE_ID = 'b4fd87a7d9c04143b10018c4224f2999';
export const ZONE_3_SHI_FEATURE_ID = 'b818d0fe7caf4151af74835aa43c7aea';

export const ZONE_3_FEATURE_ID = 'b47c1a2ffb76461592fe64438197cef9';
export const ZONE_5_FEATURE_ID = 'c4e365176fa64967b0df13237b69aa7d';
export const RAPID_INVENTORY_32_FEATURE_ID = 'cc6b9e1c42c747a2bd220f82039cf0b0';

export const EEWWF_COUNTRY_LINES_FEATURE_ID =
  '48e26caf25de440e8deef5bc52ed975e';
export const EEWWF_SPI_FEATURE_ID = '942229716581474ab9233fd23d6d0178';
export const EEWWF_SHI_FEATURE_ID = 'c3fdbdaa2fcd48b09bc9f670a1535e3a';
export const PROTECTED_AREA_EEWWF_FEATURE_ID =
  '7593f107a991471f9bb56672557a07cc';
export const PROTECTED_AREA_EEWWF_URL =
  'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/ProtectedAreas_20250416/VectorTileServer';

export const NBS_OP_INTERVENTIONS_FEATURE_ID =
  '41eb11d7bdd1474fb1a208e11546e413';

export const EXPERT_RANGE_MAP_URL =
  'https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/drc_rangemap';
export const TREND_MAP_URL =
  'https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/drc_trend';

export const REGION_RANGE_MAP_URL =
  'https://dev-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/indicators/habitat-trends/tile-urls';

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

export const GBIF_OCCURENCE_URL = '1ccb994557a74bc6bd773250d8eebc15';
// Yale AGOL - cc44bf640beb4b2c989d1e901bb90852

export const REGION_OCCURENCE_ID = '9f732963e1a7495f889577ca30e44562';

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

export const removeRegionLayers = (map, regionLayers) => {
  Object.keys(regionLayers).forEach((region) => {
    const foundLayer = map.layers.items.find((item) => item.id === region);
    if (foundLayer) {
      map.remove(foundLayer);
    }
  });
};
