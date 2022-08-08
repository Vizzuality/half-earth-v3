import { isEqual } from 'lodash';

import * as actions from './conservation-efforts-actions';

export const initialState = {
  data: null,
  loading: false,
};

function setConservationEfforts(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, ...payload };
}

export default {
  [actions.setConservationEfforts]: setConservationEfforts,
};
