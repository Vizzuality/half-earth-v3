import * as actions from './actions';

export const initialState = { subnationalSelected: false };

const setSubnationalSelected = (state, { payload }) => ({
  ...state,
  subnationalSelected: payload
});

export default {
  [actions.setSubnationalSelected]: setSubnationalSelected
};
