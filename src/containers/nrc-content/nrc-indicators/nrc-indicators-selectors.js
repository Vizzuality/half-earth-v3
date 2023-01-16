import { createStructuredSelector } from 'reselect';

import { getCountryData, getLandMarineSelected } from 'selectors/nrc-selectors';

export default createStructuredSelector({
  countryData: getCountryData,
  landMarineSelection: getLandMarineSelected,
});
