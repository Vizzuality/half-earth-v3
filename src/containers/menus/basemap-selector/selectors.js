import { createStructuredSelector } from 'reselect';

import { getLandcoverBasemap } from 'selectors/ui-selectors';

export default createStructuredSelector({
  landcoverBasemap: getLandcoverBasemap,
});
