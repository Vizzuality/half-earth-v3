import * as actions from './conservation-efforts-actions';
import { isEqual } from 'lodash';

export const initialState = {
  data: null,
  loading: false
};

function setConservationEfforts(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, ...payload };
}

export default {
  [actions.setConservationEfforts]: setConservationEfforts
};
