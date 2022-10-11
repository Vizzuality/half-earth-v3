import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectUiUrlState,
  selectLangUrlState,
} from 'selectors/location-selectors';

import { getLayersToggleConfig } from 'constants/biodiversity-layers-constants';
import { BIODIVERSITY_DEFAULT_TAB } from 'constants/ui-params';

export const getLayerVariant = createSelector(
  [selectUiUrlState],
  (uiState) =>
    (uiState && uiState.biodiversityLayerVariant) || BIODIVERSITY_DEFAULT_TAB
);

export const getAllBiodiversityActiveLayers = createSelector(
  [
    // eslint-disable-next-line no-unused-vars
    (state, props) => props && props.activeLayers,
    selectLangUrlState,
  ],
  // eslint-disable-next-line no-unused-vars
  (activeLayers, locale) => {
    if (!activeLayers || !activeLayers.length) return 0;

    // getLayersToggleConfig will update depending on the locale
    const layersToggleConfig = getLayersToggleConfig();
    const allLayers = Object.values(layersToggleConfig)
      .map((marineOrTerrestrialGroups) =>
        Object.values(marineOrTerrestrialGroups).map((resolutionGroups) =>
          Object.values(resolutionGroups).map((layers) =>
            layers.map((layer) => layer.value)
          )
        )
      )
      .flat(3);
    return activeLayers
      .map((l) => (allLayers.includes(l.title) ? l.title : null))
      .filter(Boolean);
  }
);
export const getBiodiversityCountedActiveLayers = createSelector(
  getAllBiodiversityActiveLayers,
  (activeLayers) =>
    activeLayers && activeLayers.length
      ? activeLayers.reduce(
          (acc, l) => (activeLayers.includes(l) ? acc + 1 : acc),
          0
        )
      : 0
);

export default createStructuredSelector({
  biodiversityLayerVariant: getLayerVariant,
  countedActiveLayers: getBiodiversityCountedActiveLayers,
});
