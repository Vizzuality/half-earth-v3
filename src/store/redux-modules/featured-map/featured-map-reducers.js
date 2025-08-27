import * as actions from './featured-map-actions';

export const initialState = {
  slug: 'bestPlaces',
  loading: false,
  loaded: true,
  error: false,
};

const fetchFeaturedMapData = (state) => ({
  ...state,
  loading: true,
  loaded: false,
});

const fetchFeaturedMapFail = (state, { payload }) => ({
  ...state,
  loading: false,
  loaded: false,
  error: payload,
});

const fetchFeaturedMapReady = (state, { payload }) => {
  return {
    ...state,
    loading: false,
    loaded: true,
    slug: payload.data,
  };
};

export default {
  [actions.setFeaturedMap]: fetchFeaturedMapData,
  [actions.fetchFeaturedMapFail]: fetchFeaturedMapFail,
  [actions.fetchFeaturedMapReady]: fetchFeaturedMapReady,
};
