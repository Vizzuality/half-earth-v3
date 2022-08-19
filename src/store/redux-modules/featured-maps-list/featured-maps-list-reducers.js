import * as actions from './featured-maps-list-actions';

export const initialState = {
  data: null,
  loading: false,
  loaded: true,
  error: false,
};

const fetchFeaturedMapsListData = (state) => ({ ...state, loading: true, loaded: false });

const fetchFeaturedMapsListDataFail = (state, { payload }) => ({
  ...state, loading: false, loaded: false, error: payload,
});

const fetchFeaturedMapsListDataReady = (state, { payload }) => {
  return ({
    ...state,
    loading: false,
    loaded: true,
    data: payload.data,
  });
};

export default {
  [actions.setFeaturedMapsList]: fetchFeaturedMapsListData,
  [actions.fetchFeaturedMapsDataFail]: fetchFeaturedMapsListDataFail,
  [actions.fetchFeaturedMapsDataReady]: fetchFeaturedMapsListDataReady,
};
