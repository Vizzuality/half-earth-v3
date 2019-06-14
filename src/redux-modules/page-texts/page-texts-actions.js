import { createAction, createThunkAction } from 'redux-tools';
import CONTENTFUL from 'services/contentful';
import { isEmpty } from 'lodash';

// Requires payload params:
// slug: slug to fetch
export const setPageTexts = createThunkAction('setPageTexts', slug => (dispatch, state) => {
  const { pageTexts: { data }} = state();
  if (!data[slug]) {
    dispatch(fetchPageTextsData(slug));
  }
});

export const fetchPageTextsDataFail = createAction('fetchPageTextsDataFail');
export const fetchPageTextsDataReady = createAction('fetchPageTextsDataReady');

export const fetchPageTextsData = createThunkAction('fetchPageTextsData', slug => async dispatch => {
  try {
    const data = await CONTENTFUL.getTexts(slug);
    dispatch(fetchPageTextsDataReady({ data }));
  } catch (e) {
    console.warn(e);
    dispatch(fetchPageTextsDataFail(e));
  }
});
