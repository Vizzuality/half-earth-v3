import { createStructuredSelector } from 'reselect';

export const getSidebarTabActive = ({ ui }) => ui && ui.sidebarTabActive;
export const getNRCSidebarView = ({ ui }) => ui && ui.NRCSidebarView;
export const getLandcoverBasemap = ({ ui }) => ui && ui.landcoverBasemap;

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  NRCSidebarView: getNRCSidebarView,
  landcoverBasemap: getLandcoverBasemap,
});
