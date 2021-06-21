import * as actions from './scene-actions';

export const initialState = {
  map: null,
  view:null,
};

function setSceneView(state, { payload }) {
  return { ...state, view: payload };
}

function setSceneMap(state, { payload }) {
  return { ...state, map: payload };
}

export default {
  [actions.setSceneMap]: setSceneMap,
  [actions.setSceneView]: setSceneView,
};
