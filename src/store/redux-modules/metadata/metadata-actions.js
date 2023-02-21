import { createAction, createThunkAction } from 'redux-tools';

import ContentfulService from 'services/contentful/contentful';

export const setModalMetadataParams = createAction('setModalMetadataParams');

export const fetchModalMetaDataFail = createAction('fetchModalMetaDataFail');
export const fetchModalMetaDataReady = createAction('fetchModalMetaDataReady');

export const fetchModalMetaData = createThunkAction(
  'fetchModalMetaData',
  ({ slug, locale, title }) =>
    async (dispatch) => {
      try {
        const data = await ContentfulService.getMetadata(slug, locale);
        dispatch(
          fetchModalMetaDataReady({
            slug,
            // Don't override title if we have one
            data: { ...data, title: title || data.title },
          })
        );
      } catch (e) {
        console.warn(e);
        dispatch(fetchModalMetaDataFail(e));
      }
    }
);

// Requires payload params:
// slug: slug to fetch
export const setModalMetadata = createThunkAction(
  'setModalMetadata',
  (payload) => (dispatch) => {
    dispatch(setModalMetadataParams(payload));

    if (payload.slug) {
      dispatch(
        fetchModalMetaData({
          slug: payload.slug,
          locale: payload.locale,
          title: payload.title,
        })
      );
    }
  }
);
