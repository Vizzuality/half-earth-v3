import { createStructuredSelector } from 'reselect';
import { selectAreaType } from 'selectors/aoi-selectors';

import { selectTooltipContent, selectTooltipGeometry, selectTooltipData} from 'selectors/map-tooltip-selectors';

export default createStructuredSelector({
  mapTooltipContent: selectTooltipContent,
  mapTooltipGeometry: selectTooltipGeometry,
  mapTooltipData: selectTooltipData,
  areaTypeSelected: selectAreaType,
})


