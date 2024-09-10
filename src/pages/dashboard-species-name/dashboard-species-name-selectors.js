/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectGlobeUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import dashboardViewConfig from '../../containers/views/dashboard-species-name-view/dashboard-species-name-view-config';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && (countryData.data || null);
const selectScientificName = ({ location }) => location.payload.scientificname;

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

export const getCountryISO = createSelector(
  selectCountryIso,
  (countryISO) => countryISO
);

const getCountryData = createSelector(
  [selectCountriesData, selectCountryIso],
  (countriesData, countryISO) => {
    if (!countriesData || !countryISO) {
      return null;
    }
    return countriesData[countryISO];
  }
);

const getCountryName = createSelector(
  [getCountryData],
  (countryData) => {
    if (!countryData) {
      return null;
    }
    return countryData.NAME_0;
  }
);

const getScientificName = createSelector(
  selectScientificName,
  (scientificName) => scientificName
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
  scientificName: getScientificName,
  isSidebarOpen: getSidebarVisibility,
});
