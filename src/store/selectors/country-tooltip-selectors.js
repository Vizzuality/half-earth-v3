import {  createStructuredSelector } from 'reselect';

export const selectTooltipContent = ({ countryTooltip }) => countryTooltip && countryTooltip.content;
export const selectTooltipGeometry = ({ countryTooltip }) => countryTooltip && countryTooltip.geometry;
export const selectTooltipIsVisible = ({ countryTooltip }) => countryTooltip && countryTooltip.isVisible;

export default createStructuredSelector({
  mapTooltipContent: selectTooltipContent,
  mapTooltipGeometry: selectTooltipGeometry,
  mapTooltipIsVisible: selectTooltipIsVisible,
})