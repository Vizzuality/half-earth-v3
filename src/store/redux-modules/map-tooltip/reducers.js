import * as actions from './actions';

export const initialState = { isVisible: false, isSubnational: false, content: null, geometry: null };

function setTooltipContent(state, { payload }) {
  return { ...state, content: { ...payload } };
}
function setTooltipIsVisible(state, { payload }) {
  return { ...state, isVisible: payload };
}
function setTooltipFeatureGeometry(state, { payload }) {
  return { ...state, geometry: payload };
}
function setBatchTooltipData(state, { payload: { isVisible, isSubnational, content, geometry } }) {
  return { isVisible, isSubnational, content, geometry };
}

export default {
  [actions.setTooltipContent]: setTooltipContent,
  [actions.setTooltipIsVisible]: setTooltipIsVisible,
  [actions.setBatchTooltipData]: setBatchTooltipData,
  [actions.setTooltipFeatureGeometry]: setTooltipFeatureGeometry,
};
