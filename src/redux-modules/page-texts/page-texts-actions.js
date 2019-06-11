import { createAction, createThunkAction } from 'redux-tools';
import CONTENTFUL from 'services/contentful';
import { isEmpty } from 'lodash';

// Requires payload params:
// slug: slug to fetch
export const setPageTexts = createThunkAction('setPageTexts', () => (dispatch, state) => {
  const { pageTexts: { data }} = state();
  if (!data || isEmpty(data)) {
    dispatch(fetchPageTextsData());
  }
});

export const fetchPageTextsDataFail = createAction('fetchPageTextsDataFail');
export const fetchPageTextsDataReady = createAction('fetchPageTextsDataReady');

export const fetchPageTextsData = createThunkAction('fetchPageTextsData', () => async dispatch => {
  try {
    const data = await CONTENTFUL.getTexts();
    dispatch(fetchPageTextsDataReady({ data }));
  } catch (e) {
    console.warn(e);
    dispatch(fetchPageTextsDataFail(e));
  }
});
