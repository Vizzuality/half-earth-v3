import { createAction, createThunkAction } from 'redux-tools';

import CONTENTFUL from 'services/contentful/contentful';

export const fetchFeaturedMapsDataFail = createAction(
  'fetchFeaturedMapsDataFail'
);
export const fetchFeaturedMapsDataReady = createAction(
  'fetchFeaturedMapsDataReady'
);

export const setFeaturedMapsList = createThunkAction(
  'setFeaturedMapsList',
  (locale) => async (dispatch) => {
    try {
      const data = await CONTENTFUL.getFeaturedMapData(locale);
      dispatch(fetchFeaturedMapsDataReady({ data }));
    } catch (e) {
      console.warn(e);
      dispatch(fetchFeaturedMapsDataFail(e));
    }
  }
);
