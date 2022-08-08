import * as actions from './country-data-actions';

export const initialState = { loading: false, error: false, data: null };

function setCountryDataLoading(state) {
  return { ...state, loading: true };
}

function setCountryDataReady(state, { payload }) {
  if (!payload) return state;

  const countriesData = payload.reduce((acc, country) => {
    const { attributes } = country;
    const { GID_0 } = attributes;
    return {
      ...acc,
      [GID_0]: attributes,
    };
  }, {});
  return {
    ...state, error: false, loading: false, data: { ...state.data, ...countriesData },
  };
}

function setCountryDataError(state, { payload }) {
  return {
    ...state, loading: false, data: null, error: payload,
  };
}

export default {
  [actions.setCountryDataLoading]: setCountryDataLoading,
  [actions.setCountryDataReady]: setCountryDataReady,
  [actions.setCountryDataError]: setCountryDataError,
};
