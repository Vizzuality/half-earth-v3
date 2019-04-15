import { createAction } from 'redux-tools';

export const setFeaturedGlobeLoading = createAction(
  'SET_FEATURED_GLOBE_LOADING'
);
export const setFeaturedGlobeReady = createAction(
  'SET_FEATURED_GLOBE_READY'
);
export const setFeaturedGlobeError = createAction(
  'SET_FEATURED_GLOBE_ERROR'
);