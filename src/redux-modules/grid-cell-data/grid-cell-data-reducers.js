import * as actions from './grid-cell-data-actions';
import { isEqual } from 'lodash';

export const initialState = { data: null, geojson: null };

function setGridCellData(state, { payload }) {
  const gridCellsData = payload.map(cell => cell.attributes)
  return isEqual(state.data, gridCellsData) ? state : { ...state, data: gridCellsData }
}

const setGridCellGeojson = (state, { payload }) => {
  return { ...state, geojson: payload }
}

export default {
  [actions.setGridCellData]: setGridCellData,
  [actions.setGridCellGeojson]: setGridCellGeojson
};

