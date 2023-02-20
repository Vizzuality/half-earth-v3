import { createStructuredSelector } from 'reselect';

import { selectAoiId, getAoiGeometry } from 'store/selectors/aoi-selectors';

export default createStructuredSelector({
  aoiId: selectAoiId,
  aoiStoredGeometry: getAoiGeometry,
});
