import { createStructuredSelector } from 'reselect';

export const getSidebarTabActive = ({ ui }) => ui && ui.sidebarTabActive;

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
});
