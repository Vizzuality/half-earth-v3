import { AREA_TYPES, getSidebarTabs } from 'constants/aois';

import * as actions from './actions';

const {
  REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL: FEATURE_MERGE_NATIONAL_SUBNATIONAL,
} = process.env;

const sidebarTabs = getSidebarTabs();

export const initialState = {
  areaTypeSelected: FEATURE_MERGE_NATIONAL_SUBNATIONAL
    ? AREA_TYPES.administrative : AREA_TYPES.national,
  sidebarTabActive: sidebarTabs[0].slug,
};

const setAreaTypeSelected = (state, { payload }) => ({
  ...state,
  areaTypeSelected: payload,
});

const setSidebarTabActive = (state, { payload }) => ({
  ...state,
  sidebarTabActive: payload,
});

export default {
  [actions.setAreaTypeSelected]: setAreaTypeSelected,
  [actions.setSidebarTabActive]: setSidebarTabActive,
};
