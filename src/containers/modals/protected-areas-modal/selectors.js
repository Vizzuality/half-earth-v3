import { createStructuredSelector } from 'reselect';
import { selectAoiId, getAoiGeometry, selectAreaType } from 'selectors/aoi-selectors';

const selectPrecalculatedLayerSlug = ({ location }) => location.query && location.query.precalculatedLayer;

export default createStructuredSelector({
  aoiId: selectAoiId,
  aoiStoredGeometry: getAoiGeometry,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
  areaTypeSelected: selectAreaType,
});
