import * as actions from './geo-description-actions';

export const initialState = { loading: false, error: false, data: null };

function setGeoDescriptionLoading(state, { payload }) {
  return { ...state, loading: true, geojson: payload };
}

function setGeoDescriptionReady(state, { payload }) {
  const { data } = payload;
  const { title, title_params, description, description_params } = data;
  return { ...state, error: false, loading: false, data: { title, title_params, description, description_params } };
}

function setGeoDescriptionError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setGeoDescriptionLoading]: setGeoDescriptionLoading,
  [actions.setGeoDescriptionReady]: setGeoDescriptionReady,
  [actions.setGeoDescriptionError]: setGeoDescriptionError
};
