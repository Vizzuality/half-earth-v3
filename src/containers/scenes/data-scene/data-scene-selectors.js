import { createSelector, createStructuredSelector } from 'reselect';

import { selectAreaType } from 'selectors/aoi-selectors';
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
  areaTypeSelected: selectAreaType,
  categoryActiveLayers: getCategoryActiveLayers,
  mapTooltipData: selectTooltipData,
});
