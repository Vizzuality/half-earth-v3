import { createSelector, createStructuredSelector } from 'reselect';

export const selectCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

export const getTerrestrialCellData = createSelector(
  [selectCellData],
  cellData => {
    if (!cellData) return null;
    // Marine grid cells DO NOT have Fishes rarity attribute
    return cellData.filter(c => !c.Rar_fish);
  }
)

export const getMarineCellData = createSelector(
  [selectCellData],
  cellData => {
    if (!cellData) return null;
    // Marine grid cells have Fishes rarity attribute
    return cellData.filter(c => c.Rar_fish);
  }
)

export default createStructuredSelector({
  terrestrialCells: getTerrestrialCellData,
  marineCells: getMarineCellData
})