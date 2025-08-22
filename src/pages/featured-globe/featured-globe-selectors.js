/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import {
  selectGlobeUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import featuredMapActions from '../../store/redux-modules/featured-map/featured-map';

import initialState from './featured-globe-initial-state';

const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);
const selectFeaturedMapPlaces = ({ featuredMapPlaces }) => featuredMapPlaces;
// const selectedFeaturedMapLayer = ({ featuredMap }) => featuredMap['slug'];
const selectedBestMapLayer = ({ featuredMap }) => 'bestPlaces';
const selectedDiscoveryMapLayer = ({ featuredMap }) => featuredMap['slug'];

const getGlobeSettings = createSelector(
  selectGlobeUrlState,
  (globeUrlState) => {
    return {
      ...initialState.globe,
      ...globeUrlState,
    };
  }
);

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...initialState.ui,
    ...uiUrlState,
  };
});

// GLOBE
const getActiveLayers = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.activeLayers
);

// UI
const getSelectedSidebar = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedSidebar
);
const getMapsListActive = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedSidebar === 'featuredMapsList'
);
const getSelectedFeaturedMap = createSelector(
  getUiSettings,
  // featuredMapActions.setFeaturedMap
  (uiSettings) => uiSettings.selectedFeaturedMap
);

const getSelectedBestMap = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedBestMap
);

const getSelectedDiscoveryMap = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedDiscoveryMap
);

const getSelectedFeaturedPlace = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedFeaturedPlace
);
const getSelectedTaxa = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.selectedTaxa
);
const getFullscreenActive = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.isFullscreenActive
);
const getGlobeUpdating = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.isGlobeUpdating
);
const getSelectedSpecies = createSelector(
  getGlobeSettings,
  (globeSettings) => globeSettings.selectedSpecies
);
const getHalfEarthModalOpen = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.openedModal
);

export default createStructuredSelector({
  isMapsList: getMapsListActive,
  sceneSettings: getGlobeSettings,
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  hasMetadata: selectMetadataData,
  isFullscreenActive: getFullscreenActive,
  selectedFeaturedMap: getSelectedFeaturedMap,
  // selectedFeaturedMap: selectedFeaturedMapLayer,
  selectedBestMap: getSelectedBestMap,
  selectedDiscoveryMap: getSelectedDiscoveryMap,
  selectedTaxa: getSelectedTaxa,
  selectedSidebar: getSelectedSidebar,
  selectedFeaturedPlace: getSelectedFeaturedPlace,
  featuredMapPlaces: selectFeaturedMapPlaces,
  isGlobeUpdating: getGlobeUpdating,
  selectedSpecies: getSelectedSpecies,
  openedModal: getHalfEarthModalOpen,
});
