import * as actions from './land-human-encroachment-actions';
import { isEqual } from 'lodash';

export const initialState = {
  data: null,
  loading: false,
  error: null
};

function setLandPressuresDataReady(state, { payload }) {
  return isEqual(state.data, payload) ? state : { ...state, ...payload };
}

function setLandPressuresDataError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setLandPressuresDataReady]: setLandPressuresDataReady,
  [actions.setLandPressuresDataError]: setLandPressuresDataError
};