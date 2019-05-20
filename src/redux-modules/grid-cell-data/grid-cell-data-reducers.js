import * as actions from './grid-cell-data-actions';

export const initialState = { data: null };

function setGridCellData(state, { payload }) {
  const gridCellsData = payload.reduce((acc, current) => {
      return {
        ...acc,
        [current.attributes.CELL_ID]: {
          CELL_DATA: {
            RAINFED: current.attributes.RAINFED,
            URBAN: current.attributes.URBAN,
            AGRICULTUR: current.attributes.AGRICULTUR,
            Shape__Area: current.attributes.Shape__Area,
            PROP_LAND: current.attributes.PROP_LAND,
            ISISLAND: current.attributes.ISISLAND
          },
          ...acc[current.attributes.CELL_ID],
          [current.attributes.TAXA]: {
            AVE_RSR_PC: current.attributes.AVE_RSR_PC,
            SR_PC: current.attributes.SR_PC,
            FOCAL_SPP: current.attributes.FOCAL_SPP
          }
        }
      }
    }, {})
  return { ...state, data: gridCellsData };
}

export default {
  [actions.setGridCellData]: setGridCellData
};
