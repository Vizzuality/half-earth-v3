import { createSelector, createStructuredSelector } from 'reselect';
import { selectGlobeUrlState } from 'selectors/location-selectors';
import { selectAoiId, getAoiGeometry, selectAreaType } from 'selectors/aoi-selectors';

import aoiSceneConfig from './config';

const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectPrecalculatedLayerSlug = ({location}) => location.query && location.query.precalculatedLayer;

const getGlobeSettings = createSelector([selectGlobeUrlState],
  (globeUrlState) => {
  return {
    ...aoiSceneConfig,
    ...globeUrlState
  }
})

const selectLocationObjectId = createSelector(getGlobeSettings, globeSettings => console.log('ss', globeSettings) || globeSettings.OBJECTID);

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating);


export default createStructuredSelector({
  areaTypeSelected: selectAreaType,
  aoiId: selectAoiId,
  objectId: selectLocationObjectId,
  userConfig: selectUserConfig,
  activeLayers: getActiveLayers,
  sceneSettings: getGlobeSettings,
  isGlobeUpdating: getGlobeUpdating,
  aoiStoredGeometry: getAoiGeometry,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
});
