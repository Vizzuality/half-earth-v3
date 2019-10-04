import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getFeaturedGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectUiUrlState } from 'selectors/location-selectors';
import initialState from './featured-globe-initial-state';

const selectMetadataData = ({ metadata }) => metadata && (!isEmpty(metadata.data) || null);
const selectFeaturedMapPlaces = ({ featuredMapPlaces }) => featuredMapPlaces;

const getGlobeSettings = createSelector(selectGlobeUrlState, globeUrlState => {
  return {
    ...initialState.globe,
    ...globeUrlState
  }
})

const getUiSettings = createSelector(selectUiUrlState, uiUrlState => {
  return {
    ...initialState.ui,
    ...uiUrlState
  }
})

// GLOBE
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView);
const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers);

// UI
const getSelectedSidebar = createSelector(getUiSettings, uiSettings => uiSettings.selectedSidebar);
const getMapsListActive = createSelector(getUiSettings, uiSettings => uiSettings.selectedSidebar === 'featuredMapsList');
const getSelectedFeaturedMap = createSelector(getUiSettings, uiSettings => uiSettings.selectedFeaturedMap);
const getSelectedFeaturedPlace = createSelector(getUiSettings, uiSettings => uiSettings.selectedFeaturedPlace);
const getSelectedTaxa = createSelector(getUiSettings, uiSettings => uiSettings.selectedTaxa);
const getFullscreenActive = createSelector(getUiSettings, uiSettings => uiSettings.isFullscreenActive);
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
const getSelectedSpecies = createSelector(getGlobeSettings, globeSettings => globeSettings.selectedSpecies)
export const getRasters = createSelector(getGlobeSettings, globeSettings => globeSettings.rasters)

export default createStructuredSelector({
  isMapsList: getMapsListActive,
  sceneSettings: getGlobeSettings,
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  hasMetadata: selectMetadataData,
  isFullscreenActive: getFullscreenActive,
  selectedFeaturedMap: getSelectedFeaturedMap,
  selectedTaxa: getSelectedTaxa,
  selectedSidebar: getSelectedSidebar,
  selectedFeaturedPlace: getSelectedFeaturedPlace,
  featuredMapPlaces: selectFeaturedMapPlaces,
  rasters: getRasters,
  isGlobeUpdating: getGlobeUpdating,
  selectedSpecies: getSelectedSpecies
})