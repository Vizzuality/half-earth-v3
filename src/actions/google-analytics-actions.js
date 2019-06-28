
import { createAction } from 'redux-tools';

export const addLayerAnalyticsEvent = createAction('addLayer', null, ({ slug, query }) => {
  const viewMode = query && query.terrain ? 'Landscape view' : 'Map menu';
  return { analytics: [ viewMode, 'Add layer', `${slug}` ] };
});

export const removeLayerAnalyticsEvent = createAction('removeLayer', null, ({ slug, query }) => {
  const viewMode = query && query.terrain ? 'Landscape view' : 'Map menu';
  return { analytics: [ viewMode, 'Remove layer', `${slug}` ] };
});

export default {
  addLayerAnalyticsEvent,
  removeLayerAnalyticsEvent
}