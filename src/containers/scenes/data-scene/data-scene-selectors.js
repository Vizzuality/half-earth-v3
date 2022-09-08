import { createSelector, createStructuredSelector } from 'reselect';

import { selectAreaType, selectAoiId } from 'selectors/aoi-selectors';
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

const getActiveCategoryLayers = createSelector(getUiSettings, (
  uiSettings,
) => uiSettings.activeCategoryLayers);

export default createStructuredSelector({
  aoiId: selectAoiId,
  areaTypeSelected: selectAreaType,
  activeCategoryLayers: getActiveCategoryLayers,
  mapTooltipData: selectTooltipData,
});
