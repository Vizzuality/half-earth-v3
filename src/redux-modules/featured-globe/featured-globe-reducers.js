import * as actions from './featured-globe-actions';

export const initialState = { loading: false, error: false, data: null };

function setFeaturedGlobeLoading(state) {
  return { ...state, loading: true };
}

function setFeaturedGlobeReady(state, { payload }) {
  return { ...state, loading: false, data: payload };
}

function setFeaturedGlobeError(state, { payload }) {
  return { ...state, loading: false, error: payload };
}

export default {
  [actions.setFeaturedGlobeLoading]: setFeaturedGlobeLoading,
  [actions.setFeaturedGlobeReady]: setFeaturedGlobeReady,
  [actions.setFeaturedGlobeError]: setFeaturedGlobeError
};
