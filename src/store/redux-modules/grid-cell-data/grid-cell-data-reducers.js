import * as actions from './grid-cell-data-actions';
import { isEqual } from 'lodash';

export const initialState = { data: null, geometry: null };

function setGridCellData(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, data: payload };
}

function setGridCellGeometry(state, { payload }) {
  return { ...state, geometry: payload }
}

export default {
  [actions.setGridCellData]: setGridCellData,
  [actions.setGridCellGeometry]: setGridCellGeometry
};
