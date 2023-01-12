import { createStructuredSelector } from 'reselect';

export const getSidebarTabActive = ({ ui }) => ui && ui.sidebarTabActive;
export const getNRCSidebarView = ({ ui }) => ui && ui.NRCSidebarView;

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  NRCSidebarView: getNRCSidebarView,
});
