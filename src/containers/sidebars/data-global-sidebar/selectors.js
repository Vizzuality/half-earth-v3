import { createStructuredSelector } from 'reselect';

import { getSidebarTabActive } from 'selectors/ui-selectors';

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
});
