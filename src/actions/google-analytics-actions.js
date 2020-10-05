
import { createAction } from 'redux-tools';
import { VIEW_MODE } from  'constants/google-analytics-constants';

export const addLayerAnalyticsEvent = createAction('addLayer', null, ({ slug, query }) => {
  const viewMode = query && (query.viewMode || VIEW_MODE.GLOBE);
  return { analytics: [ viewMode, 'Add layer', `${slug}` ] };
});

export const removeLayerAnalyticsEvent = createAction('removeLayer', null, ({ slug, query }) => {
  const viewMode = query && (query.viewMode || VIEW_MODE.GLOBE);
  return { analytics: [ viewMode, 'Remove layer', `${slug}` ] };
});

export const changeLayerOpacityAnalyticsEvent = createAction('changeOpacity', null, ({ slug, query }) => {
  const opacity = query && query.opacity;
  return { analytics: [ VIEW_MODE.LEGEND, 'Change layer opacity', `${slug}`, opacity ] };
});

export const openLayerInfoModalAnalyticsEvent = createAction('openLayerInfoModal', null, ({ slug, query }) => {
  const viewMode = query && (query.viewMode || VIEW_MODE.GLOBE);
  return { analytics: [ viewMode, 'Open layer info modal', `${slug}`] };
});

export const openHalfEarthMeterAnalyticsEvent = createAction('openHalfEarthMeter', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Open half earth meter'] };
});

export const openAboutPageAnalyticsEvent = createAction('openAboutPage', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Open about page'] };
});

export const clickFindMyPositionAnalyticsEvent = createAction('findMyPosition', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Find my position'] };
});

export const toggleFullScreenAnalyticsEvent = createAction('enableFullScreen', null, ({ isFullscreenActive }) => {
  const fullscreenState = isFullscreenActive ? 'enabled' : 'disabled';
  return { analytics: [ VIEW_MODE.GLOBE, 'Toggle fullscreen mode', fullscreenState] };
});

export const settingsAnalyticsEvent = createAction('changeLayers', null, ({ notDisplayedLayers }) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Change layers (Not displayed layers)', notDisplayedLayers] };
});

export const switchAboutPageTabAnalyticsEvent = createAction('switchAboutPageTab', null, ({ activeTab }) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Change an active tab in About page', activeTab] };
});

export const openPlacesSearchAnalyticsEvent = createAction('openPlacesSearch', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Click on find places' ] };
});

export const enterLandscapeModeAnalyticsEvent = createAction('enterLandscapeMode', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Enter landscape mode' ] };
});

export const searchLocationAnalyticsEvent = createAction('searchLocation', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Search for a location' ] };
});

export const changeLayersOrderAnalyticsEvent = createAction('changeLayersOrder', null, () => {
  return { analytics: [ VIEW_MODE.LEGEND, 'Change layers order' ] };
});

export const helpCompleteDatabaseAnalyticsEvent = createAction('helpCompleteDatabase', null, () => {
  return { analytics: [ VIEW_MODE.LANDSCAPE, 'Help to complete database' ] };
});

export const openShareModalAnalyticsEvent = createAction('openShareModal', null, (viewMode) => {
  return { analytics: [ viewMode || VIEW_MODE.GLOBE, 'Open share modal',  ] };
});

export default {
  addLayerAnalyticsEvent,
  removeLayerAnalyticsEvent,
  changeLayerOpacityAnalyticsEvent,
  openLayerInfoModalAnalyticsEvent,
  openHalfEarthMeterAnalyticsEvent,
  openAboutPageAnalyticsEvent,
  clickFindMyPositionAnalyticsEvent,
  toggleFullScreenAnalyticsEvent,
  switchAboutPageTabAnalyticsEvent,
  openPlacesSearchAnalyticsEvent,
  enterLandscapeModeAnalyticsEvent,
  searchLocationAnalyticsEvent,
  changeLayersOrderAnalyticsEvent,
  helpCompleteDatabaseAnalyticsEvent,
  openShareModalAnalyticsEvent
}