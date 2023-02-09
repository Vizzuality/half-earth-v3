import { createStructuredSelector } from 'reselect';

import { getSidebarTabActive } from 'selectors/ui-selectors';

const selectPrecalculatedLayerSlug = ({ location }) =>
  location.query && location.query.precalculatedLayerSlug;

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
});
