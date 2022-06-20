import { BIODIVERSITY_DEFAULT_TAB } from 'constants/ui-params';
import { selectUiUrlState } from 'selectors/location-selectors';
import { createSelector, createStructuredSelector } from 'reselect';
import { LAYERS_TOGGLE_CONFIG } from 'constants/biodiversity-layers-constants';

export const getLayerVariant = createSelector(
  [selectUiUrlState],
  (uiState) =>
    (uiState && uiState.biodiversityLayerVariant) || BIODIVERSITY_DEFAULT_TAB
);

export const getCountedActiveLayers = createSelector(
  [(state, props) => props && props.activeLayers], (activeLayers) => {
    if(!activeLayers || !activeLayers.length) return 0;

    const allLayers = Object.values(LAYERS_TOGGLE_CONFIG)
      .map((marineOrTerrestrialGroups) =>
        Object.values(marineOrTerrestrialGroups).map((resolutionGroups) =>
          Object.values(resolutionGroups).map((layers) =>
            layers.map((layer) => layer.value)
          )
        )
      )
      .flat(3);
    return activeLayers
      .map((l) => l.title)
      .reduce((acc, l) => (allLayers.includes(l) ? acc + 1 : acc), 0);
});

export default createStructuredSelector({
  biodiversityLayerVariant: getLayerVariant,
  countedActiveLayers: getCountedActiveLayers
})
