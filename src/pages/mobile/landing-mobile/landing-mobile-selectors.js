import { createSelector, createStructuredSelector } from 'reselect';

import { selectGlobeUrlState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/landing-scene/landing-scene-config';

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...dataSceneConfig.globe,
      ...globeUrlState,
    };
  }
);

export default createStructuredSelector({
  sceneSettings: getGlobeSettings,
});
