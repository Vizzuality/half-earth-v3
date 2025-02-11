/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

import { selectGlobeUrlState } from 'selectors/location-selectors';

import dashboardViewConfig from '../../containers/views/dashboard-view/dashboard-view-config';

const selectCountryIso = () =>
  window.location.hostname.split('.')[0].toUpperCase();
const selectCountriesData = ({ countryData }) =>
  countryData && (countryData.data || null);
const selectQueryParams = ({ location }) => location.query;

const getViewSettings = createSelector(selectGlobeUrlState, (globeUrlState) => {
  return {
    ...dashboardViewConfig.view,
    ...globeUrlState,
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

const getCountryName = createSelector([getCountryData], (countryData) => {
  if (!countryData) {
    return null;
  }
  return countryData.NAME_0;
});

const getQueryParams = createSelector(
  selectQueryParams,
  (queryParams) => queryParams
);

export default createStructuredSelector({
  viewSettings: getViewSettings,
  activeLayers: getActiveLayers,
  countryISO: getCountryISO,
  countryName: getCountryName,
  queryParams: getQueryParams,
});
