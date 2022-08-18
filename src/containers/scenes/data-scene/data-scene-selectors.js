import { createStructuredSelector } from 'reselect';
import { selectAreaType } from 'selectors/aoi-selectors';

import { selectTooltipContent, selectTooltipGeometry, selectTooltipIsVisible } from 'selectors/map-tooltip-selectors';

export default createStructuredSelector({
  mapTooltipContent: selectTooltipContent,
  mapTooltipGeometry: selectTooltipGeometry,
  mapTooltipIsVisible: selectTooltipIsVisible,
  areaTypeSelected: selectAreaType,
})


