import { createAction } from 'redux-tools';

export const setTooltipContent = createAction('SET_TOOLTIP_CONTENT');
export const setTooltipIsVisible = createAction('SET_TOOLTIP_IS_VISIBLE');
export const setTooltipFeatureGeometry = createAction(
  'SET_TOOLTIP_FEATURE_GEOMETRY'
);
export const setBatchTooltipData = createAction('SET_BATCH_TOOLTIP_DATA');
