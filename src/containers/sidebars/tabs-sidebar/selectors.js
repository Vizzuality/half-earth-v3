import { createSelector, createStructuredSelector } from 'reselect';

import { setSidebarTabActive } from 'selectors/aoi-selectors';
import { selectUiUrlState } from 'selectors/location-selectors';

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
  sidebarTabActive: setSidebarTabActive,
  activeCategoryLayers: getActiveCategoryLayers,
});
