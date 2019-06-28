
import { createAction } from 'redux-tools';

export const addLayerAnalyticsEvent = createAction('addLayer', null, ({ slug, query }) => {
  const viewMode = query && query.terrain ? 'Landscape view' : 'Map menu';
  console.log('addLayerAnalyticsEvent');
  return { analytics: [ viewMode, 'Add layer', `${slug}` ] };
});

export default {
  addLayerAnalyticsEvent,
}