import { createStructuredSelector } from 'reselect';
import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';

export default createStructuredSelector({
  terrestrialCellData: getTerrestrialCellData,
}); 