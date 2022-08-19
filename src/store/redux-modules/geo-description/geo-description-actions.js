import { createAction } from 'redux-tools';

export const setGeoDescriptionLoading = createAction(
  'SET_GEO_DESCRIPTION_LOADING',
);
export const setGeoDescriptionReady = createAction(
  'SET_GEO_DESCRIPTION_READY',
);
export const setGeoDescriptionError = createAction(
  'SET_GEO_DESCRIPTION_ERROR',
);

export default {
  setGeoDescriptionLoading,
  setGeoDescriptionReady,
  setGeoDescriptionError,
};
