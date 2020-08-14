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
        border: payload.border
      }
    }
  }
}

function setCountryMaskReady(state, { payload }) {
  return {
    ...state,
    [payload.iso]: {
      ...state[payload.iso],
      mask: payload.mask
    }
  }
}

function setCountryExtentReady(state, { payload }) {
  return {
    ...state,
    [payload.iso]: {
      ...state[payload.iso],
      extent: payload.extent
    }
  }
}

function setCountryGeometryError(state, { payload }) {
  return { ...state, loading: false, data: null, error: payload };
}

export default {
  [actions.setCountryGeometryLoading]: setCountryGeometryLoading,
  [actions.setCountryGeometryError]: setCountryGeometryError,
  [actions.setCountryExtentReady]: setCountryExtentReady,
  [actions.setCountryBorderReady]: setCountryBorderReady,
  [actions.setCountryMaskReady]: setCountryMaskReady,
};
