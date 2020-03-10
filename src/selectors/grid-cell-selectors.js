import { sumBy } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

export const selectCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

export const getTerrestrialCellData = createSelector(
  [selectCellData],
  cellData => {
    if (!cellData) return null;
    return cellData.filter(c => c.ID);
  }
)

export const getTerrestrialHumanPressures = createSelector(
  [selectCellData],
  cellData=> {
    if (!cellData) return null;
    const terrestrialGridCells = cellData.filter(c => c.ISMARINE === 0);
    if (terrestrialGridCells.length === 0) return { rainfed: 0, agriculture: 0, urban: 0, pressureFree: 100 };
    const pressures = terrestrialGridCells.reduce((acc, current) => {
      return {
        ...acc,
        [current.CELL_ID]: {
          rainfed: current.RAINFED,
          urban: current.URBAN,
          agriculture: current.AGRICULTURE
        }
        }
    }, {});
    const pressuresValues = Object.values(pressures)
    const gridCellsLength = Object.keys(pressures).length;
    const rainfed = sumBy(pressuresValues, 'rainfed') / gridCellsLength;
    const agriculture = sumBy(pressuresValues, 'agriculture') / gridCellsLength;
    const urban = sumBy(pressuresValues, 'urban') / gridCellsLength;
    const pressureFree = 100 - (rainfed + agriculture + urban)
    return {
      rainfed,
      agriculture,
      urban,
      pressureFree
    }
  }
)

export default createStructuredSelector({
  terrestrialCells: getTerrestrialCellData,
  humanPressures: getTerrestrialHumanPressures
})