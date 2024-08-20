/* eslint-disable max-len */
import { createSelector, createStructuredSelector } from 'reselect';

const selectCountryIso = ({ location }) => location.payload.iso.toUpperCase();

export const getCountryISO = createSelector(
  selectCountryIso,
  (countryISO) => countryISO
);

export default createStructuredSelector({
  countryISO: getCountryISO,
});
