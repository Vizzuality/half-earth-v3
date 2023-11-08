import { getSidebarTabs } from 'constants/ui-params';

import * as actions from './actions';

const sidebarTabs = getSidebarTabs();

export const initialState = {
  sidebarTabActive: sidebarTabs[0].slug,
  NRCSidebarView: 'main',
  fullRanking: false,
  basemap: 'default',
};

const setSidebarTabActive = (state, { payload }) => ({
  ...state,
  sidebarTabActive: payload,
});

const setNRCSidebarView = (state, { payload }) => ({
  ...state,
  NRCSidebarView: payload,
});

const setBasemap = (state, { payload }) => ({
  ...state,
  basemap: payload,
});

export default {
  [actions.setSidebarTabActive]: setSidebarTabActive,
  [actions.setNRCSidebarView]: setNRCSidebarView,
  [actions.setBasemap]: setBasemap,
};
