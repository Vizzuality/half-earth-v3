import { createAction, createThunkAction } from 'redux-tools';
  import CONTENTFUL from 'services/contentful';

export const setFeaturedMapsList = createThunkAction('setFeaturedMapsList', (locale) => async (dispatch, state) => {
  try {
    const data = await CONTENTFUL.getFeaturedMapData(locale);
    dispatch(fetchFeaturedMapsDataReady({ data }));
  } catch (e) {
    console.warn(e);
    dispatch(fetchFeaturedMapsDataFail(e));
    }
});

export const fetchFeaturedMapsDataFail = createAction('fetchFeaturedMapsDataFail');
export const fetchFeaturedMapsDataReady = createAction('fetchFeaturedMapsDataReady');
