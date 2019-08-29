import { createSelector, createStructuredSelector } from 'reselect';
import { sumBy } from 'lodash';
import { getKeyByValue } from 'utils/generic-functions';

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
    return {
      WDPA_prop,
      RAISG_prop,
      all_prop
    }
  }
)

const getConservationAreasLogic = createSelector(
  [getConservationEfforts],
  (conservationEfforts) => {
    if (!conservationEfforts) return null;

    const areas = {};
    if (conservationEfforts.WDPA_prop + conservationEfforts.RAISG_prop > conservationEfforts.all_prop) {
      areas[PROTECTED] = (conservationEfforts.all_prop - conservationEfforts.RAISG_prop) * 100;
    } else {
      areas[PROTECTED] = conservationEfforts.WDPA_prop * 100;
    }

    areas[COMMUNITY_BASED] = conservationEfforts.RAISG_prop * 100;
    areas[NOT_UNDER_CONSERVATION] = (100 - (areas[COMMUNITY_BASED] + areas[PROTECTED]));

    return areas;
  }
)

const getConservationAreasFormatted = createSelector(
  [getConservationAreasLogic],
  (conservationAreasLogic) => {
    if (!conservationAreasLogic) return null;

    const formattedAreas = Object.values(conservationAreasLogic).reduce((obj, key) => {
      const newKey = getKeyByValue(conservationAreasLogic, key);
      obj[newKey] = key.toFixed(2);
      return obj;
    }, {});

    return formattedAreas;
  }
)

export default createStructuredSelector({
  terrestrialCellData: getTerrestrialCellData,
  pieChartData: getConservationEfforts,
  dataFormatted: getConservationAreasFormatted,
  rawData: getConservationAreasLogic, 
  colors: COLORS
});