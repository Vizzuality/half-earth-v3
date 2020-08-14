import { createAction } from 'redux-tools';

export const setCountryGeometryLoading = createAction(
  'SET_COUNTRY_GEOMETRY_LOADING'
);
export const setCountryGeometryError = createAction(
  'SET_COUNTRY_GEOMETRY_ERROR'
);
export const setCountryExtentReady = createAction(
  'SET_COUNTRY_EXTENT_GEOMETRY_READY'
);
export const setCountryBorderReady = createAction(
  'SET_COUNTRY_BORDER_GEOMETRY_READY'
);
export const setCountryMaskReady = createAction(
  'SET_COUNTRY_MASK_GEOMETRY_READY'
);