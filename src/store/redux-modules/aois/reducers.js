import { NATIONAL_BOUNDARIES_TYPE } from 'constants/aois';
import * as actions from './actions';

export const initialState = { areaTypeSelected: NATIONAL_BOUNDARIES_TYPE };

const setAreaTypeSelected = (state, { payload }) => ({
  ...state,
  areaTypeSelected: payload
});

export default {
  [actions.setAreaTypeSelected]: setAreaTypeSelected
};
