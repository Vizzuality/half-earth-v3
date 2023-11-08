import { createStructuredSelector } from 'reselect';

import { getBasemap } from 'selectors/ui-selectors';

export default createStructuredSelector({
  basemap: getBasemap,
});
