import { createSelector, createStructuredSelector } from 'reselect';

import { setSidebarTabActive } from 'selectors/aoi-selectors';
import { selectUiUrlState } from 'selectors/location-selectors';

import aoiSceneConfig from 'containers/scenes/aoi-scene/config';
import { getBiodiversityCountedActiveLayers } from 'containers/sidebars/map-layers/biodiversity-sidebar-card/biodiversity-sidebar-card-selectors';
import { getCarbonCountedActiveLayers } from 'containers/sidebars/map-layers/carbon-sidebar-card/carbon-sidebar-card-selectors';
import { getHumanCountedActiveLayers } from 'containers/sidebars/map-layers/human-impact-sidebar-card/human-impact-sidebar-card-selectors';
import { getProtectionCountedActiveLayers } from 'containers/sidebars/map-layers/protected-areas-sidebar-card/protected-areas-sidebar-card-selectors';

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
  biodiversityCountedActiveLayers: getBiodiversityCountedActiveLayers,
  protectionCountedActiveLayers: getProtectionCountedActiveLayers,
  humanCountedActiveLayers: getHumanCountedActiveLayers,
  carbonCountedActiveLayers: getCarbonCountedActiveLayers,
});
