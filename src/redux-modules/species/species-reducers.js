import * as actions from './species-actions';
import { isEqual } from 'lodash';

export const initialState = { data: null };

function setSpecies(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, data: payload };
}

export default {
  [actions.setSpecies]: setSpecies
};