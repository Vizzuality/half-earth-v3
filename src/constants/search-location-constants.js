import {
  ADMIN_AREAS_FEATURE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  } from 'constants/layers-slugs';

import { LAYERS_URLS } from 'constants/layers-urls';

export const SEARCH_SOURCES_CONFIG = {
  [ADMIN_AREAS_FEATURE_LAYER]: {
    url: LAYERS_URLS[ADMIN_AREAS_FEATURE_LAYER],
    title: ADMIN_AREAS_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME_1", "NAME_0"],
    suggestionTemplate: '{NAME_1}, {NAME_0}'
  },
  [WDPA_OECM_FEATURE_LAYER]: {
    url: LAYERS_URLS[WDPA_OECM_FEATURE_LAYER],
    title: WDPA_OECM_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME"],
    suggestionTemplate: '{NAME}, {ISO3}'
  }
}