import { createAction, createThunkAction } from 'redux-tools';
  import CONTENTFUL from 'services/contentful';

export const setFeaturedMapsList = createThunkAction('setFeaturedMapsList', () => async (dispatch, state) => {
  const { featuredMapsList } = state();
  const { data } = featuredMapsList || {};

  if (!data) {
    try {
      const data = await CONTENTFUL.getFeaturedMapData();
      dispatch(fetchFeaturedMapsDataReady({ data }));
    } catch (e) {
      console.warn(e);
      dispatch(fetchFeaturedMapsDataFail(e));
    }
  }
});

export const fetchFeaturedMapsDataFail = createAction('fetchFeaturedMapsDataFail');
export const fetchFeaturedMapsDataReady = createAction('fetchFeaturedMapsDataReady');
