import {  createStructuredSelector } from 'reselect';

export const selectTooltipContent = ({ mapTooltip }) => mapTooltip && mapTooltip.content;
export const selectTooltipGeometry = ({ mapTooltip }) => mapTooltip && mapTooltip.geometry;
export const selectTooltipIsVisible = ({ mapTooltip }) => mapTooltip && mapTooltip.isVisible;

export default createStructuredSelector({
  mapTooltipContent: selectTooltipContent,
  mapTooltipGeometry: selectTooltipGeometry,
  mapTooltipIsVisible: selectTooltipIsVisible,
})