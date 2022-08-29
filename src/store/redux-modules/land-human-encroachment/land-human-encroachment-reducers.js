import * as actions from './land-human-encroachment-actions';

export const initialState = {
  data: null,
  loading: false,
  error: null,
};

function setLandPressuresDataReady(state, { payload }) {
  return {
    ...state, loading: false, data: payload, error: null,
  };
}

function setLandPressuresDataError(state, { payload }) {
  return {
    ...state, loading: false, data: null, error: payload,
  };
}

function setLandPressuresDataLoading(state) {
  return {
    ...state, loading: true, data: null, error: null,
  };
}

export default {
  [actions.SET_LAND_PRESSURES_DATA_READY]: setLandPressuresDataReady,
  [actions.STORE_LAND_PRESSURES_DATA_ERROR]: setLandPressuresDataError,
  [actions.STORE_LAND_PRESSURES_DATA_LOADING]: setLandPressuresDataLoading,
};
