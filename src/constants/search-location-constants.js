import {
  ECOREGIONS_FEATURE_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_FEATURE_LAYER,
  } from 'constants/layers-slugs';

import { LAYERS_URLS } from 'constants/layers-urls';

export const SEARCH_SOURCES_CONFIG = {
  [ADMIN_AREAS_FEATURE_LAYER]: {
    url: LAYERS_URLS[ADMIN_AREAS_FEATURE_LAYER],
    title: ADMIN_AREAS_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME", "ISO_CODE"],
    suggestionTemplate: '{NAME}, {COUNTRY}'
  },
  [ECOREGIONS_FEATURE_LAYER]: {
    url: LAYERS_URLS[ECOREGIONS_FEATURE_LAYER],
    title: ECOREGIONS_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["ECO_NAME"],
    suggestionTemplate: '{ECO_NAME}'
  },
  [PROTECTED_AREAS_FEATURE_LAYER]: {

  }
}