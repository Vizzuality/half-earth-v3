import { createAction } from 'redux-tools';

export const setDataGlobeLoading = createAction(
  'SET_DATA_GLOBE_LOADING'
);
export const setDataGlobeReady = createAction(
  'SET_DATA_GLOBE_READY'
);
export const setDataGlobeError = createAction(
  'SET_DATA_GLOBE_ERROR'
);