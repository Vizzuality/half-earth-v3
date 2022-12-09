import * as actions from './actions';

export const initialState = {
  isVisible: false,
  precalculatedLayerSlug: null,
  content: null,
  geometry: null,
};

function setTooltipContent(state, { payload }) {
  return { ...state, content: { ...payload } };
}
function setTooltipIsVisible(state, { payload }) {
  return { ...state, isVisible: payload };
}
function setTooltipFeatureGeometry(state, { payload }) {
  return { ...state, geometry: payload };
}
function setBatchTooltipData(
  state,
  { payload: { isVisible, precalculatedLayerSlug, content, geometry } }
) {
  return {
    isVisible,
    precalculatedLayerSlug,
    content,
    geometry,
  };
}

export default {
  [actions.setTooltipContent]: setTooltipContent,
  [actions.setTooltipIsVisible]: setTooltipIsVisible,
  [actions.setBatchTooltipData]: setBatchTooltipData,
  [actions.setTooltipFeatureGeometry]: setTooltipFeatureGeometry,
};
