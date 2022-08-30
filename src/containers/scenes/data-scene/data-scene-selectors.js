import { createStructuredSelector } from 'reselect';
import { selectAreaType } from 'selectors/aoi-selectors';

import { selectTooltipContent, selectTooltipGeometry, selectTooltipData, selectTooltipIsVisible } from 'selectors/map-tooltip-selectors';

export default createStructuredSelector({
  mapTooltipContent: selectTooltipContent,
  mapTooltipGeometry: selectTooltipGeometry,
  mapTooltipIsVisible: selectTooltipIsVisible,
  mapTooltipData: selectTooltipData,
  areaTypeSelected: selectAreaType,
})