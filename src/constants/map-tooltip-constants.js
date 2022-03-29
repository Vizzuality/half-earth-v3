import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER
} from 'constants/layers-slugs';


const MAP_TOOLTIP_CONFIG = {
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER] : {
    title: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID'
  },
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER] : {
    title: 'NAME_1',
    subtitle: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID'
  },
  [WDPA_OECM_FEATURE_LAYER] : {
    title: 'NAME',
    subtitle: '',
    buttonText: 'analyze area',
    id: 'MOL_ID'
  },
  [GLOBAL_SPI_FEATURE_LAYER] : {
    title: 'NAME_0',
    subtitle: '',
    buttonText: 'analyze area',
    id: 'GlobalID',
    iso: 'GID_0'
  },
  [HALF_EARTH_FUTURE_TILE_LAYER] : {
    title: 'cluster', // Overriten on function
    subtitle: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID' // Overriten on function
  }
}

export default MAP_TOOLTIP_CONFIG;
