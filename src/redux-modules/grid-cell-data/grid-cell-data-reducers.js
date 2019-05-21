import * as actions from './grid-cell-data-actions';

export const initialState = { data: null };

function setGridCellData(state, { payload }) {
  const gridCellsData = payload.reduce((acc, current) => {
    const previousSpecies = acc.SPECIES || acc.attributes.FOCAL_SPP;
      return {
        ...acc,
        [current.attributes.CELL_ID]: {
          RAINFED: current.attributes.RAINFED,
          URBAN: current.attributes.URBAN,
          AGRICULTUR: current.attributes.AGRICULTUR,
          Shape__Area: current.attributes.Shape__Area,
          PROP_LAND: current.attributes.PROP_LAND,
          ISISLAND: current.attributes.ISISLAND
        },
        SPECIES: `${current.attributes.FOCAL_SPP}, ${previousSpecies}`
      }
    })
  return { ...state, data: gridCellsData };
}

export default {
  [actions.setGridCellData]: setGridCellData
};
