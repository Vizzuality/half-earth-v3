import * as actions from './selected-featured-map-actions';

export const initialState = {
  data: null,
  loading: false,
  loaded: true,
  error: false
};

const fetchSelectedFeaturedMapData = state => ({ ...state, loading: true, loaded: false });

const fetchSelectedFeaturedMapDataFail = (state, { payload }) => ({ ...state, loading: false, loaded: false, error: payload });

const fetchSelectedFeaturedMapDataReady = (state, { payload }) => {
  return ({
    ...state,
    loading: false,
    loaded: true,
    data: payload.data
  })
};

export default {
  [actions.setFeaturedMaps]: fetchSelectedFeaturedMapData,
  [actions.fetchFeaturedMapsDataFail]: fetchSelectedFeaturedMapDataFail,
  [actions.fetchFeaturedMapsDataReady]: fetchSelectedFeaturedMapDataReady
}