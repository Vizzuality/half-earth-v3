import * as actions from './geo-description-actions';

export const initialState = { loading: false, error: false, data: null };

function setGeoDescriptionLoading(state, { payload }) {
  return { ...state, loading: true, geojson: payload };
}

function setGeoDescriptionReady(state, { payload }) {
  return { ...state, loading: false, data: payload };
}

function setGeoDescriptionError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

function clearGeoDescription() {
  return initialState;
}

export default {
  [actions.setGeoDescriptionLoading]: setGeoDescriptionLoading,
  [actions.setGeoDescriptionReady]: setGeoDescriptionReady,
  [actions.setGeoDescriptionError]: setGeoDescriptionError,
  [actions.clearGeoDescription]: clearGeoDescription
};
