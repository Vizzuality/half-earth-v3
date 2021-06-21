import * as actions from './user-config-actions';

export const initialState = {
  layers: { boundaries: true, labels: true }
};

function setUserLayerSlugs(state, { payload }) {
  return { ...state, layers: { ...state.layers, ...payload } };
}

export default {
  [actions.setUserLayerSlugs]: setUserLayerSlugs
};
