import { createSelector, createStructuredSelector } from 'reselect';

import { selectAoiId, getAoiGeometry, selectAreaType } from 'selectors/aoi-selectors';
import { selectUiUrlState, selectGlobeUrlState } from 'selectors/location-selectors';

import aoiSceneConfig from './config';

const selectPrecalculatedLayerSlug = ({ location }) => location.query
  && location.query.precalculatedLayer;

const selectLocationObjectId = ({ location }) => location.query && location.query.OBJECTID;

const getGlobeSettings = createSelector(
  [selectGlobeUrlState],
  (globeUrlState) => {
    return {
      ...aoiSceneConfig,
      ...globeUrlState,
    };
  },
);

const getUiSettings = createSelector(
  selectUiUrlState,
  (uiUrlState) => {
    return {
      ...aoiSceneConfig.ui,
      ...uiUrlState,
    };
  },
);

const getActiveLayers = createSelector(getGlobeSettings, (
  globeSettings,
) => globeSettings.activeLayers);

const getGlobeUpdating = createSelector(getGlobeSettings, (
  globeSettings,
) => globeSettings.isGlobeUpdating);

const getCategoryActiveLayers = createSelector(getUiSettings, (
  uiSettings,
) => uiSettings.categoryActiveLayers);

export default createStructuredSelector({
  areaTypeSelected: selectAreaType,
  aoiId: selectAoiId,
  objectId: selectLocationObjectId,
  activeLayers: getActiveLayers,
  sceneSettings: getGlobeSettings,
  isGlobeUpdating: getGlobeUpdating,
  aoiStoredGeometry: getAoiGeometry,
  categoryActiveLayers: getCategoryActiveLayers,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
});
