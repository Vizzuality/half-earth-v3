import * as actions from './country-data-actions';

export const initialState = { loading: false, error: false, data: null };

function setCountryDataLoading(state) {
  return { ...state, loading: true };
}

function setCountryDataReady(state, { payload }) {
  const country = payload[0];
  const { attributes } = country;
  return { ...state, error: false, loading: false, data: attributes };
}

function setCountryDataError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setCountryDataLoading]: setCountryDataLoading,
  [actions.setCountryDataReady]: setCountryDataReady,
  [actions.setCountryDataError]: setCountryDataError
};
