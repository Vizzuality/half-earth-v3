import { createStructuredSelector } from 'reselect';

import { getPathname } from 'selectors/location-selectors';

export default createStructuredSelector({
  pathname: getPathname,
});
