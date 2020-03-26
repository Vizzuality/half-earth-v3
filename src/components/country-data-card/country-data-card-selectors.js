import { createStructuredSelector } from 'reselect';

const getCountryData = ({ countryData }) => (countryData && countryData.data) || null;

export default createStructuredSelector({
  countryData: getCountryData
})