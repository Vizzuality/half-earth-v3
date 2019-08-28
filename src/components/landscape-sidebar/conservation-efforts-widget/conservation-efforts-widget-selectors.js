import { createSelector, createStructuredSelector } from 'reselect';
import { sumBy } from 'lodash';

import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';

export const COMMUNITY_BASED = 'community';
export const PROTECTED = 'protected';
export const NOT_UNDER_CONSERVATION = 'notUnderConservation';

const COLORS = () => ({
  [COMMUNITY_BASED]: '#FCC44A',
  [PROTECTED]: '#FF6C47',
  [NOT_UNDER_CONSERVATION]: '#6C828F'
})

const conservationEffortsData = ({ conservationEffortsData }) => conservationEffortsData && conservationEffortsData.data;

const getConservationEfforts = createSelector(
  [conservationEffortsData],
  cellData => {
    if (!cellData) return null;
    const conservationEfforts = cellData.reduce((acc, current) => {
      return {
        ...acc,
        [current.CELL_ID]: {
          WDPA_prop: current.WDPA_prop,
          RAISG_prop: current.RAISG_prop,
          all_prop: current.all_prop
        }
        }
    }, {});
    const values = Object.values(conservationEfforts)
    const gridCellsLength = Object.keys(conservationEfforts).length;
    const WDPA_prop = sumBy(values, 'WDPA_prop') / gridCellsLength;
    const RAISG_prop = sumBy(values, 'RAISG_prop') / gridCellsLength;
    const all_prop = sumBy(values, 'all_prop') / gridCellsLength;
    const notUnderConservation = 1 - (all_prop);
    const roundedWDPA_prop = WDPA_prop.toFixed(2);
    const roundedRAISG_prop = RAISG_prop.toFixed(2);
    const roundedAllProp = all_prop.toFixed(2);
    const roundedNotUnderCons = notUnderConservation.toFixed(2);
    return {
      roundedWDPA_prop,
      roundedRAISG_prop,
      roundedAllProp,
      roundedNotUnderCons
    }
  }
)

const getLogic = createSelector(
  [getConservationEfforts],
  (conservationEfforts) => {
    if (!conservationEfforts) return null;

    const areas = {};
    if (conservationEfforts.roundedWDPA_prop + conservationEfforts.roundedRAISG_prop > conservationEfforts.roundedAllProp) {
      areas[COMMUNITY_BASED] = conservationEfforts.roundedRAISG_prop * 100;
      areas[PROTECTED] = (conservationEfforts.roundedAllProp - conservationEfforts.roundedRAISG_prop) * 100;
      areas[NOT_UNDER_CONSERVATION] = conservationEfforts.roundedNotUnderCons * 100;
    } else {
      areas[COMMUNITY_BASED] = conservationEfforts.roundedRAISG_prop * 100;
      areas[PROTECTED] = conservationEfforts.roundedWDPA_prop * 100;
      areas[NOT_UNDER_CONSERVATION] = conservationEfforts.roundedNotUnderCons * 100;
    }

    return areas;
  }
)

export default createStructuredSelector({
  terrestrialCellData: getTerrestrialCellData,
  pieChartData: getConservationEfforts,
  calculatedChartData: getLogic,
  colors: COLORS
});