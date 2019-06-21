import { sumBy } from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

export const selectCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

export const getCellSpecies = createSelector(selectCellData, cellData => {
  if (!cellData) return null;
  const species = cellData.map(cell => JSON.parse(cell.FOCAL_SPP));
  return species;
})

export const getHumanPressures = createSelector(
  [selectCellData],
  cellData=> {
    if (!cellData) return null;
    const pressures = cellData.reduce((acc, current) => {
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
  cellSpecies: getCellSpecies,
  humanPressures: getHumanPressures
})