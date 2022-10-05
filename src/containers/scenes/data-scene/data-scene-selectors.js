import { createSelector, createStructuredSelector } from 'reselect';

import { selectAoiId } from 'selectors/aoi-selectors';
import { selectUiUrlState } from 'selectors/location-selectors';
import { selectTooltipData } from 'selectors/map-tooltip-selectors';
import { getSidebarTabActive } from 'selectors/ui-selectors';

import {
  getSelectedAnalysisLayer,
  getSelectedAnalysisTab,
} from 'pages/data-globe/data-globe-selectors';

import aoiSceneConfig from 'containers/scenes/aoi-scene/config';

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...aoiSceneConfig.ui,
    ...uiUrlState,
  };
});

const getActiveCategoryLayers = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.activeCategoryLayers
);

export default createStructuredSelector({
  aoiId: selectAoiId,
  activeCategoryLayers: getActiveCategoryLayers,
  mapTooltipData: selectTooltipData,
  sidebarTabActive: getSidebarTabActive,
  selectedAnalysisLayer: getSelectedAnalysisLayer,
  selectedAnalysisTab: getSelectedAnalysisTab,
});
