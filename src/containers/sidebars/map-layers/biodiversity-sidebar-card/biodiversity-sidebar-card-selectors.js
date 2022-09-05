import { BIODIVERSITY_DEFAULT_TAB } from 'constants/ui-params';
import { selectUiUrlState, selectLangUrlState } from 'selectors/location-selectors';
import { createSelector, createStructuredSelector } from 'reselect';
import { getLayersToggleConfig } from 'constants/biodiversity-layers-constants';

export const getLayerVariant = createSelector(
  [selectUiUrlState],
  (uiState) => (uiState && uiState.biodiversityLayerVariant) || BIODIVERSITY_DEFAULT_TAB,
);

export const getCountedActiveLayers = createSelector([(state, props) => props && props.activeLayers, selectLangUrlState], (activeLayers, locale) => {
  if (!activeLayers || !activeLayers.length) return 0;

  // getLayersToggleConfig will update depending on the locale
  const layersToggleConfig = getLayersToggleConfig();
  const allLayers = Object.values(layersToggleConfig)
    .map((marineOrTerrestrialGroups) => Object.values(marineOrTerrestrialGroups).map((resolutionGroups) => Object.values(resolutionGroups).map((layers) => layers.map((layer) => layer.value))))
    .flat(3);
  return activeLayers
    .map((l) => l.title)
    .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  biodiversityLayerVariant: getLayerVariant,
  countedActiveLayers: getCountedActiveLayers,
});
