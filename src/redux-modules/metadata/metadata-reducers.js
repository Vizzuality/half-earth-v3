import * as actions from './metadata-actions';

export const initialState = {
  isOpen: false,
  title: '',
  slug: '',
  data: {},
  loading: false,
  loaded: true,
  error: false
};

const setModalMetadataParams = (state, { payload }) => ({ ...state, ...payload });

const fetchModalMetaData = state => ({ ...state, loading: true, loaded: false });

const fetchModalMetaDataFail = (state, { payload }) => ({ ...state, loading: false, loaded: false, error: payload });

const fetchModalMetaDataReady = (state, { payload }) => ({
  ...state,
  loading: false,
  loaded: true,
  data: { ...state.data, [payload.slug]: payload.data }
});

export default {
  [actions.setModalMetadataParams]: setModalMetadataParams,
  [actions.fetchModalMetaData]: fetchModalMetaData,
  [actions.fetchModalMetaDataFail]: fetchModalMetaDataFail,
  [actions.fetchModalMetaDataReady]: fetchModalMetaDataReady
};
