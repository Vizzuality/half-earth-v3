import { createStructuredSelector } from 'reselect';

import { getCountryData } from 'selectors/nrc-selectors';

export default createStructuredSelector({
  countryData: getCountryData,
});
