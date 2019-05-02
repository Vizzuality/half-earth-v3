import * as actions from './data-globe-actions';

export const initialState = { loading: false, error: false, data: null };

function setDataGlobeLoading(state) {
  return { ...state, loading: true };
}

function setDataGlobeReady(state, { payload }) {
  return { ...state, loading: false, data: payload };
}

function setDataGlobeError(state, { payload }) {
  return { ...state, loading: false, error: payload };
}

export default {
  [actions.setDataGlobeLoading]: setDataGlobeLoading,
  [actions.setDataGlobeReady]: setDataGlobeReady,
  [actions.setDataGlobeError]: setDataGlobeError
};
