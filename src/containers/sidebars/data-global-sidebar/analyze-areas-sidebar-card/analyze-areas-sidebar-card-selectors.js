import { createStructuredSelector } from 'reselect';
import { selectAreaType } from 'selectors/aoi-selectors';

export default createStructuredSelector({
  areaTypeSelected: selectAreaType,
});
