/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { selectGlobeUrlState } from 'selectors/location-selectors';

import dataSceneConfig from 'scenes/landing-scene/landing-scene-config';

const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...dataSceneConfig.globe,
      ...globeUrlState,
    };
  },
);

export default createStructuredSelector({
  sceneSettings: getGlobeSettings,
  hasMetadata: selectMetadataData,
});
