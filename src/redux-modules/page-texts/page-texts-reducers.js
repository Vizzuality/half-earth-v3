import * as actions from './page-texts-actions';

export const initialState = {
  data: {},
  loading: false,
  loaded: true,
  error: false
};

const fetchPageTextsData = state => ({ ...state, loading: true, loaded: false });

const fetchPageTextsDataFail = (state, { payload }) => ({ ...state, loading: false, loaded: false, error: payload });

const fetchPageTextsDataReady = (state, { payload }) => {
  return ({
    ...state,
    loading: false,
    loaded: true,
    data: { ...state.data, ...payload.data }
  })
};

export default {
  [actions.fetchPageTextsData]: fetchPageTextsData,
  [actions.fetchPageTextsDataFail]: fetchPageTextsDataFail,
  [actions.fetchPageTextsDataReady]: fetchPageTextsDataReady
};
