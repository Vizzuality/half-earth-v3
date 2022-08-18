import { AREA_TYPES } from 'constants/aois';
import * as actions from './actions';

export const initialState = { areaTypeSelected: AREA_TYPES.administrative };

const setAreaTypeSelected = (state, { payload }) => ({
  ...state,
  areaTypeSelected: payload
});

export default {
  [actions.setAreaTypeSelected]: setAreaTypeSelected
};
