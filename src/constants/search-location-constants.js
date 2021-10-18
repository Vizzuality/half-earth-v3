import {
  GLOBAL_SPI_FEATURE_LAYER
  } from 'constants/layers-slugs';

import { LAYERS_URLS } from 'constants/layers-urls';

export const SEARCH_SOURCES_CONFIG = {
  [GLOBAL_SPI_FEATURE_LAYER]: {
    url: LAYERS_URLS[GLOBAL_SPI_FEATURE_LAYER],
    title: GLOBAL_SPI_FEATURE_LAYER,
    outFields: ["*"],
    searchFields: ["NAME_0"],
    suggestionTemplate: '{NAME_0}'
  },
}
