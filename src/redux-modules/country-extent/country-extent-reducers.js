import * as actions from './country-extent-actions';

export const initialState = { loading: false, error: false, data: null };

function setCountryExtentLoading(state) {
  return { ...state, loading: true };
}

function setCountryExtentReady(state, { payload }) {
  return { ...state, error: false, loading: false, data: payload };
}

function setCountryExtentError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setCountryExtentLoading]: setCountryExtentLoading,
  [actions.setCountryExtentReady]: setCountryExtentReady,
  [actions.setCountryExtentError]: setCountryExtentError
};
