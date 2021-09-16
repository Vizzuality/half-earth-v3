import * as actions from './actions';

export const initialState = { isOpen: false, content: null, geometry: null };

function setTooltipContent(state, { payload }) {
  return { ...state, content: { ...payload } };
}
function setTooltipIsVisible(state, { payload }) {
  return { ...state, isVisible: payload };
}
function setTooltipFeatureGeometry(state, { payload }) {
  return { ...state, geometry: payload };
}

export default {
  [actions.setTooltipContent]: setTooltipContent,
  [actions.setTooltipIsVisible]: setTooltipIsVisible,
  [actions.setTooltipFeatureGeometry]: setTooltipFeatureGeometry,
};
