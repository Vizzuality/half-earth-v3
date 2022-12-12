import { createStructuredSelector } from 'reselect';

import { selectAoiId, getAoiGeometry } from 'selectors/aoi-selectors';

const selectPrecalculatedLayerSlug = ({ location }) =>
  location.query && location.query.precalculatedLayerSlug;

export default createStructuredSelector({
  aoiId: selectAoiId,
  aoiStoredGeometry: getAoiGeometry,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
});
