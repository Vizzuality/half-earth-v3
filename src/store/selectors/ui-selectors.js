import { createStructuredSelector } from 'reselect';

export const getSidebarTabActive = ({ ui }) => ui && ui.sidebarTabActive;
export const getNRCSidebarView = ({ ui }) => ui && ui.NRCSidebarView;
export const getBasemap = ({ ui }) => ui && ui.basemap;

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  NRCSidebarView: getNRCSidebarView,
  basemap: getBasemap,
});
