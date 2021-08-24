import { createSelector, createStructuredSelector } from 'reselect';
import { selectGlobeUrlState } from 'selectors/location-selectors';

import nrcSceneConfig from 'scenes/nrc-scene/nrc-scene-config';

const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectAoiId = ({location}) => location.payload.id;

const getGlobeSettings = createSelector([selectGlobeUrlState],
  (globeUrlState) => {
  return {
    ...nrcSceneConfig,
    ...globeUrlState
  }
})

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating);


export default createStructuredSelector({
  userConfig: selectUserConfig,
  aoiId: selectAoiId,
  activeLayers: getActiveLayers,
  sceneSettings: getGlobeSettings,
  isGlobeUpdating: getGlobeUpdating,
});