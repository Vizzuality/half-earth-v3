import { createStructuredSelector } from 'reselect';
import { selectTooltipData } from 'selectors/map-tooltip-selectors';

export default createStructuredSelector({
  mapTooltipData: selectTooltipData
})