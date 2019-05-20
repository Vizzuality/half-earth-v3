import { createSelector, createStructuredSelector } from 'reselect';

export const selectGridCellData = ({ gridCellData }) => gridCellData && (gridCellData.data || null);

const getSpecies = createSelector([selectGridCellData], gridCellData => {
  const speciesArray = Object.keys(gridCellData)
    .map(k => gridCellData[k].SPECIES.split(','))
    .reduce((acc, current) => [...acc, ...current])
  return new Set(speciesArray);
})

export default createStructuredSelector({
  getSpecies
})