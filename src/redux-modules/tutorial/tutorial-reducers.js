import * as actions from './tutorial-actions';

export const initialState = { enabled: true };

function setTutorialEnabled(state, { payload }) {
  return { enabled: payload };
}

export default {
  [actions.setTutorialEnabled]: setTutorialEnabled
};