import * as actions from './actions';

export const initialState = { areaTypeSelected: false };

const setAreaTypeSelected = (state, { payload }) => ({
  ...state,
  areaTypeSelected: payload
});

export default {
  [actions.setAreaTypeSelected]: setAreaTypeSelected
};
