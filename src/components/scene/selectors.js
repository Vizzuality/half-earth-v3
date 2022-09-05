import { createStructuredSelector } from 'reselect';

import { getIsGlobesMenuPages } from 'selectors/location-selectors';

export default createStructuredSelector({
  isGlobesMenuPages: getIsGlobesMenuPages,
});
