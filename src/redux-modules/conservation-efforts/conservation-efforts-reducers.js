import * as actions from './conservation-efforts-actions';
import { isEqual } from 'lodash';

export const initialState = { data: null };

function setConservationEfforts(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, data: payload };
}

export default {
  [actions.setConservationEfforts]: setConservationEfforts
};
