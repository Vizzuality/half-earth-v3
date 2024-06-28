/* eslint-disable max-len */
import { isEmpty } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectGlobeUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import dashboardViewConfig from '../../containers/views/dashboard-trends-view/dashboard-trends-view-config';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

const selectBiodiversityData = ({ biodiversityData }) =>
  biodiversityData && (biodiversityData.data || null);
const selectMetadataData = ({ metadata }) =>
  metadata && (!isEmpty(metadata.data) || null);

const getViewSettings = createSelector(selectGlobeUrlState, (globeUrlState) => {
  return {
    ...dashboardViewConfig.view,
    ...globeUrlState,
  };
});

const getUiSettings = createSelector(selectUiUrlState, (uiUrlState) => {
  return {
    ...dashboardViewConfig.ui,
    ...uiUrlState,
  };
});

export const getActiveLayers = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.activeLayers
);
const getSelectedSpecies = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.selectedSpecies
);
export const getCountryISO = createSelector(
  selectCountryIso,
  (countryISO) => countryISO
);
const getCountryName = createSelector(
  getViewSettings,
  (viewSettings) => viewSettings.countryName
);
const getSidebarVisibility = createSelector(
  getUiSettings,
  (uiSettings) => uiSettings.isSidebarOpen
);

export default createStructuredSelector({
  viewSettings: getViewSettings,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  isSidebarOpen: getSidebarVisibility,
  speciesCategories: selectBiodiversityData,
  hasMetadata: selectMetadataData,
  selectedSpecies: getSelectedSpecies,
});
