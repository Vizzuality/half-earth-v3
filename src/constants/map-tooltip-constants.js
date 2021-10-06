import {
  ECOREGIONS_FEATURE_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  WDPA_OECM_FEATURE_LAYER
} from 'constants/layers-slugs';


const MAP_TOOLTIP_CONFIG = {
  [ECOREGIONS_FEATURE_LAYER] : {
    title: 'ECO_NAME',
    subtitle: '',
    buttonText: 'analyze area',
    id: 'fid'
  },
  [ADMIN_AREAS_FEATURE_LAYER] : {
    title: 'NAME_1',
    subtitle: 'NAME_0',
    buttonText: 'analyze area',
    id: 'MOL_ID'
  },
  [WDPA_OECM_FEATURE_LAYER] : {
    title: 'NAME',
    subtitle: '',
    buttonText: 'analyze area',
    id: 'WDPAID'
  }
}

export default MAP_TOOLTIP_CONFIG;