import { createSelector, createStructuredSelector } from 'reselect';

import { selectUiUrlState } from 'selectors/location-selectors';
import { selectTooltipData } from 'selectors/map-tooltip-selectors';

import aoiSceneConfig from 'containers/scenes/aoi-scene/config';

const getUiSettings = createSelector(
  selectUiUrlState,
  (uiUrlState) => {
    return {
      ...aoiSceneConfig.ui,
      ...uiUrlState,
    };
  },
);

const getCategoryActiveLayers = createSelector(getUiSettings, (
  uiSettings,
) => uiSettings.categoryActiveLayers);

export default createStructuredSelector({
  categoryActiveLayers: getCategoryActiveLayers,
  mapTooltipData: selectTooltipData,
});
