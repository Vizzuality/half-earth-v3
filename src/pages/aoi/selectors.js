import { createSelector, createStructuredSelector } from 'reselect';
import { selectGlobeUrlState } from 'selectors/location-selectors';

import aoiSceneConfig from 'scenes/aoi-scene/config';

const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectAoiId = ({location}) => location.payload.id;
const selectAoiGeometry = ({location}) => location.query && location.query.aoi_geometry;
const selectPrecalculatedLayerSlug = ({location}) => location.query && location.query.precalculatedLayer;

const getGlobeSettings = createSelector([selectGlobeUrlState],
  (globeUrlState) => {
  return {
    ...aoiSceneConfig,
    ...globeUrlState
  }
})

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating);


export default createStructuredSelector({
  aoiId: selectAoiId,
  userConfig: selectUserConfig,
  activeLayers: getActiveLayers,
  sceneSettings: getGlobeSettings,
  isGlobeUpdating: getGlobeUpdating,
  urlQueryGeometry: selectAoiGeometry,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
});