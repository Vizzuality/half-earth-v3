import { createStructuredSelector } from 'reselect';
import { selectAoiId, getAoiGeometry, selectAreaTypeSelected } from 'selectors/aoi-selectors';

const selectUserConfig = ({ userConfig }) => userConfig || null;
const selectPrecalculatedLayerSlug = ({location}) => location.query && location.query.precalculatedLayer;

export default createStructuredSelector({
  aoiId: selectAoiId,
  userConfig: selectUserConfig,
  aoiStoredGeometry: getAoiGeometry,
  precalculatedLayerSlug: selectPrecalculatedLayerSlug,
  areaTypeSelected: selectAreaTypeSelected,
});
