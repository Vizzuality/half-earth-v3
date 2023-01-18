/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/mobile/nrc-landing-scene-mobile/scene-config';

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...dataSceneConfig.globe,
      ...globeUrlState,
    };
  }
);

export const getActiveLayers = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.activeLayers
);

export const getCountryISO = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.countryTooltipDisplayFor
);

const getCountryName = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.countryName
);

export default createStructuredSelector({
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  sceneSettings: getGlobeSettings,
  sceneLayers: getDataGlobeLayers,
});
