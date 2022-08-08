import * as actions from './featured-map-places-actions';

export const initialState = {
  data: null,
  loading: false,
  loaded: true,
  error: false,
};

const fetchFeaturedMapPlacesData = (state) => ({ ...state, loading: true, loaded: false });

const fetchFeaturedMapPlacesFail = (state, { payload }) => ({
  ...state, loading: false, loaded: false, error: payload,
});

const fetchFeaturedMapPlacesReady = (state, { payload }) => {
  return ({
    ...state,
    loading: false,
    loaded: true,
    data: payload.data,
  });
};

export default {
  [actions.setFeaturedMapPlaces]: fetchFeaturedMapPlacesData,
  [actions.fetchFeaturedMapPlacesFail]: fetchFeaturedMapPlacesFail,
  [actions.fetchFeaturedMapPlacesReady]: fetchFeaturedMapPlacesReady,
};
