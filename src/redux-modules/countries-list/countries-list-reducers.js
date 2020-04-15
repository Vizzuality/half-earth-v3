import * as actions from './countries-list-actions';

export const initialState = { loading: false, error: false, data: null };

function setCountriesListLoading(state) {
  return { ...state, loading: true };
}

function setCountriesListReady(state, { payload }) {
  if (!payload) return {...state, data: null};
  const countriesData = payload.reduce((acc, country) => {
    return {
      ...acc,
      [country.attributes.GID_0]: {
        name: country.attributes.NAME_0,
        iso_code: country.attributes.GID_0
      }
    }
  }, {});
  const countriesList = Object.keys(countriesData).map(key => countriesData[key].name)
  return { ...state, error: false, loading: false, data: { countriesList, countriesData } };
}

function setCountriesListError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setCountriesListLoading]: setCountriesListLoading,
  [actions.setCountriesListReady]: setCountriesListReady,
  [actions.setCountriesListError]: setCountriesListError
};
