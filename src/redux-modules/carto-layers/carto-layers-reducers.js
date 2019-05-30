import * as actions from './carto-layers-actions';

export const initialState = {
  loading: false,
  error: false,
  data: null
};

function setDatasetsLoading(state) {
  return {
    ...state,
    loading: true
  };
}

function setDatasetsReady(state, { payload }) {
  return {
    ...state,
    loading: false,
    data: payload
  };
}

function setDatasetsError(state, { payload }) {
  return {
    ...state,
    loading: false,
    error: payload
  };
}

export default {
  [actions.setDatasetsLoading]: setDatasetsLoading,
  [actions.setDatasetsReady]: setDatasetsReady,
  [actions.setDatasetsError]: setDatasetsError
};
