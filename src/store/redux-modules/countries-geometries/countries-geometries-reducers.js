import * as actions from './countries-geometries-actions';

export const initialState = { loading: false, error: false, data: null };

function setCountryGeometryLoading(state) {
  return { ...state, loading: true };
}

function setCountryBorderReady(state, { payload }) {
  const iso = payload.iso;
  const otherCountryGeometries = (state.data && state.data[iso]) || {}
  return {
    loading: false,
    error: false,
    data: {
      ...state.data,
      [payload.iso]: {
        ...otherCountryGeometries,
        borderGraphic: payload.borderGraphic
      }
    }
  }
}

function setCountryMaskReady(state, { payload }) {
  const iso = payload.iso;
  const otherCountryGeometries = (state.data && state.data[iso]) || {}
  return {
    loading: false,
    error: false,
    data: {
      ...state.data,
      [payload.iso]: {
        ...otherCountryGeometries,
        mask: payload.mask
      }
    }
  }
}

function setCountryGeometryError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setCountryGeometryLoading]: setCountryGeometryLoading,
  [actions.setCountryGeometryError]: setCountryGeometryError,
  [actions.setCountryBorderReady]: setCountryBorderReady,
  [actions.setCountryMaskReady]: setCountryMaskReady,
};
