
import { createAction } from 'redux-tools';
import { VIEW_MODE } from 'constants/google-analytics-constants';

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
  return { analytics: [ VIEW_MODE.GLOBE, 'Open Find places search modal' ] };
});

export const enterLandscapeModeAnalyticsEvent = createAction('enterLandscapeMode', null, () => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Enter landscape mode' ] };
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

// Country related actions on Globe 
export const exploreCountryFromTooltipAnalyticsEvent = createAction('exploreCountryFromTooltip', null, ({ countryName }) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Use explore button to visit country', countryName ] };
});

export const exploreCountryFromSearchAnalyticsEvent = createAction('exploreCountryFromSearch', null, ({ countryName }) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Use search to visit country', countryName ] };
});

export const searchTermsAnalyticsEvent = createAction('searchTermsAnalyticsEvent', null, (searchTerm) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Search a location from find places', searchTerm ] };
});

export const clickOnCountryAnalyticsEvent = createAction('clickOnCountry', null, ({ countryName }) => {
  return { analytics: [ VIEW_MODE.GLOBE, 'Click on a country on the globe', countryName ] };
});

// National Report Cards events
export const downloadCountryPdfAnalyticsEvent = createAction('downloadCountryPdf', null, (countryName) => {
  return { analytics: [ VIEW_MODE.NRC, 'Download National Report CArd PDF', countryName ] };
});

export const clickSpeciesProtectionIndexInfoAnalyticsEvent = createAction('clickSpeciesProtectionIndexInfo', null, () => {
  console.log('SPI info button cl')
  return { analytics: [ VIEW_MODE.NRC, 'SPI info button clicked' ] };
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
  changeLayersOrderAnalyticsEvent,
  helpCompleteDatabaseAnalyticsEvent,
  openShareModalAnalyticsEvent,
  exploreCountryFromTooltipAnalyticsEvent,
  exploreCountryFromSearchAnalyticsEvent,
  searchTermsAnalyticsEvent,
  clickOnCountryAnalyticsEvent,
  downloadCountryPdfAnalyticsEvent,
  clickSpeciesProtectionIndexInfoAnalyticsEvent
}