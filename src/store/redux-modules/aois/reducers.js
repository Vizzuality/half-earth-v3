import { AREA_TYPES } from 'constants/aois';
import * as actions from './actions';

const {
  REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL: FEATURE_MERGE_NATIONAL_SUBNATIONAL
} = process.env;

export const initialState = { areaTypeSelected: FEATURE_MERGE_NATIONAL_SUBNATIONAL ? AREA_TYPES.administrative : AREA_TYPES.national };

const setAreaTypeSelected = (state, { payload }) => ({
  ...state,
  areaTypeSelected: payload,
});

export default {
  [actions.setAreaTypeSelected]: setAreaTypeSelected,
};
