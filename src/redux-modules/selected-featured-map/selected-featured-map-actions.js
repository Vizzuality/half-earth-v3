import { createAction, createThunkAction } from 'redux-tools';
import CONTENTFUL from 'services/contentful';

export const setFeaturedMaps = createThunkAction('setFeaturedMaps', () => async (dispatch, state) => {
  const { selectedFeaturedMap: { data }} = state();
  if (!data) {
    try {
      const data = await CONTENTFUL.getFeaturedMapData();
      console.log(data)
      dispatch(fetchFeaturedMapsDataReady({ data }));
    } catch (e) {
      console.warn(e);
      dispatch(fetchFeaturedMapsDataFail(e));
    }
  }
});

export const fetchFeaturedMapsDataFail = createAction('fetchFeaturedMapsDataFail');
export const fetchFeaturedMapsDataReady = createAction('fetchFeaturedMapsDataReady');
