import { isEqual } from 'lodash';

import * as actions from './species-actions';

export const initialState = {
  data: null,
  loading: false,
};

function setSpeciesData(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, ...payload };
}

export default {
  [actions.setSpeciesData]: setSpeciesData,
};
