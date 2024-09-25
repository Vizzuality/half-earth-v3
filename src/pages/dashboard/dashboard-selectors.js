/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectGlobeUrlState,
  selectUiUrlState,
} from 'selectors/location-selectors';

import dashboardViewConfig from '../../containers/views/dashboard-view/dashboard-view-config';
import dashboardTrendViewConfig from 'containers/views/dashboard-trends-view/dashboard-trends-view-config';
import { SPECIES_SELECTED_COOKIE } from '../../utils/dashboard-utils';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && (countryData.data || null);
const selectScientificName = ({ location }) => location.payload.scientificname ?? localStorage.getItem(SPECIES_SELECTED_COOKIE);

const getViewSettings = createSelector(selectGlobeUrlState, (globeUrlState) => {
  return {
    ...dashboardViewConfig.view,
    ...globeUrlState,
  };
});

const getTrendViewSettings = createSelector(selectGlobeUrlState, (globeUrlState) => {
  return {
    ...dashboardTrendViewConfig.view,
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
  trendViewSettings: getTrendViewSettings,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  scientificName: getScientificName,
  isSidebarOpen: getSidebarVisibility,
});
