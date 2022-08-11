import { createAction, createThunkAction } from 'redux-tools';
import ContentfulService from 'services/contentful';


export const setModalMetadataParams = createAction('setModalMetadataParams');

// Requires payload params:
// slug: slug to fetch
export const setModalMetadata = createThunkAction('setModalMetadata', payload => (dispatch) => {
  dispatch(setModalMetadataParams(payload));

  if (payload.slug) {
    dispatch(fetchModalMetaData({ slug: payload.slug, locale: payload.locale }));
  }
});

export const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
export const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');
export const fetchModalMetaData = createThunkAction('fetchModalMetaData', ({ slug, locale }) => async dispatch => {
  try {
    const data = await ContentfulService.getMetadata(slug, locale);
    dispatch(fetchModalMetaDataReady({ slug, data }));
  } catch (e) {
    console.warn(e);
    dispatch(fetchModalMetaDataFail(e));
  }
});
