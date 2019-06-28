
import { createAction } from 'redux-tools';
import { VIEW_MODE } from  'constants/google-analytics-constants';

export const addLayerAnalyticsEvent = createAction('addLayer', null, ({ slug, query }) => {
  const viewMode = query && query.viewMode || VIEW_MODE.GLOBE;
  return { analytics: [ viewMode, 'Add layer', `${slug}` ] };
});

export const removeLayerAnalyticsEvent = createAction('removeLayer', null, ({ slug, query }) => {
  const viewMode = query && query.viewMode || VIEW_MODE.GLOBE;
  return { analytics: [ viewMode, 'Remove layer', `${slug}` ] };
});

export const changeLayerOpacityAnalyticsEvent = createAction('changeOpacity', null, ({ slug, query }) => {
  const opacity = query && query.opacity;
  return { analytics: [ VIEW_MODE.LEGEND, 'Change layer opacity', `${slug}`, opacity ] };
});


export default {
  addLayerAnalyticsEvent,
  removeLayerAnalyticsEvent,
  changeLayerOpacityAnalyticsEvent
}