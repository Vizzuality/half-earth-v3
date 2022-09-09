import { createStructuredSelector } from 'reselect';

import { setSidebarTabActive } from 'selectors/aoi-selectors';

export default createStructuredSelector({
  sidebarTabActive: setSidebarTabActive,
});
