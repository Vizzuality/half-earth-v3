import * as actions from './actions';

export const initialState = { data: {} };

const setAoiGeometry = (state, { payload }) => ({
  data: {
    ...state.data,
    [payload.hash]: payload.geometry
  }
});

export default {
  [actions.setAoiGeometry]: setAoiGeometry
};
