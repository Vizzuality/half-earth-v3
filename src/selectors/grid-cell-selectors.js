import { createSelector, createStructuredSelector } from 'reselect';

export const selectCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

export const getTerrestrialCellData = createSelector(
  [selectCellData],
  cellData => {
    if (!cellData) return null;
    return cellData.filter(c => c.ID);
  }
)

export const getMarineCellData = createSelector(
  [selectCellData],
  cellData => {
    if (!cellData) return null;
    return cellData.filter(c => c.CELL_ID);
  }
)

export default createStructuredSelector({
  terrestrialCells: getTerrestrialCellData,
  marineCells: getMarineCellData
})