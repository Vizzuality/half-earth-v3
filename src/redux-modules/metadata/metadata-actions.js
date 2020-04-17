import { createAction, createThunkAction } from 'redux-tools';
import MetadataService from 'services/metadata-service';

export const setModalMetadataParams = createAction('setModalMetadataParams');

// Requires payload params:
// slug: slug to fetch
export const setModalMetadata = createThunkAction('setModalMetadata', payload => (dispatch, state) => {
  const { metadata: { data }} = state();
  dispatch(setModalMetadataParams(payload));
  if (payload.slug && !data[payload.slug]) {
    dispatch(fetchModalMetaData(payload.slug));
  }
});

export const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
export const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');
export const fetchModalMetaData = createThunkAction('fetchModalMetaData', slug => async dispatch => {
  try {
    const data = await MetadataService.getMetadata(slug);
    dispatch(fetchModalMetaDataReady({ slug, data }));
  } catch (e) {
    console.warn(e);
    dispatch(fetchModalMetaDataFail(e));
  }
});
