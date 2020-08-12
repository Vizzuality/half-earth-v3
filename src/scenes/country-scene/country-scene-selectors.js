import { createStructuredSelector } from 'reselect';

const selectCountriesData = ({ countryData }) => countryData.data || null;

export default createStructuredSelector({
  countriesData: selectCountriesData
})
