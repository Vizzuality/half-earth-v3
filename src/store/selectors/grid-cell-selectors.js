import { createSelector, createStructuredSelector } from 'reselect';

export const selectCellData = ({ gridCellData }) => (gridCellData && gridCellData.data) || null;

export const getCellData = createSelector(
  [selectCellData],
  (cellData) => {
    if (!cellData) return null;
    return cellData;
  },
);

export default createStructuredSelector({
  cellData: getCellData,
});
