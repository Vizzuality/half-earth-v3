
import { createAction } from 'redux-tools';
import { CATEGORIES, ACTIONS } from 'constants/google-analytics-constants';
const createGtagEventStructure = (category, action, label = null) => ({ analytics: { category, action, label }})

export const addLayerAnalyticsEvent = createAction('addLayer', null, ({ slug }) => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.ADD_LAYER, slug)
});

export const removeLayerAnalyticsEvent = createAction('removeLayer', null, ({ slug }) => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.REMOVE_LAYER, slug)
});

export const changeLayerOpacityAnalyticsEvent = createAction('changeOpacity', null, ({ slug }) => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.CHANGE_OPACITY, slug)
});

export const openInfoModalAnalyticsEvent = createAction('openLayerInfoModal', null, ({ slug }) => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.OPEN_INFO, slug)
});

export const openHalfEarthMeterAnalyticsEvent = createAction('openHalfEarthMeter', null, () => {
  return createGtagEventStructure(CATEGORIES.PROJECT_INFO, ACTIONS.OPEN_HALFEARTH_METER)
});

export const openAboutPageAnalyticsEvent = createAction('openAboutPage', null, () => {
  return createGtagEventStructure(CATEGORIES.PROJECT_INFO, ACTIONS.CONSULT_ABOUT_PAGE)
});

export const settingsAnalyticsEvent = createAction('updateMapSettings', null, ({ notDisplayedLayers }) => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.UPDATE_SETTINGS, notDisplayedLayers)
});

export const enterLandscapeModeAnalyticsEvent = createAction('enterLandscapeMode', null, () => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.ENTER_LANDSCAPE)
});

export const changeLayersOrderAnalyticsEvent = createAction('changeLayersOrder', null, () => {
  return createGtagEventStructure(CATEGORIES.LAYER_INTERACTION, ACTIONS.CHANGE_ORDER)
});

export const helpCompleteDatabaseAnalyticsEvent = createAction('helpCompleteDatabase', null, () => {
  return createGtagEventStructure(CATEGORIES.FOLLOW_UP_ACTIONS, ACTIONS.CONTRIBUTE_DATA)
});

export const openShareModalAnalyticsEvent = createAction('openShareModal', null, (viewMode) => {
  return createGtagEventStructure(CATEGORIES.FOLLOW_UP_ACTIONS, ACTIONS.SHARE_MAP, viewMode)
});

// Country related actions on Globe
export const exploreCountryFromTooltipAnalyticsEvent = createAction('exploreCountryFromTooltip', null, ({ countryName }) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.ENTER_COUNTRY_FROM_TOOLTIP, countryName)
});

export const exploreCountryFromSearchAnalyticsEvent = createAction('exploreCountryFromSearch', null, ({ countryName }) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.ENTER_COUNTRY_FROM_SEARCH, countryName)
});

export const searchTermsAnalyticsEvent = createAction('searchTermsAnalyticsEvent', null, (searchTerm) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.FIND_PLACES_SEARCH, searchTerm)
});

// National Report Cards events
export const downloadCountryPdfAnalyticsEvent = createAction('downloadCountryPdf', null, (countryName) => {
  return createGtagEventStructure(CATEGORIES.FOLLOW_UP_ACTIONS, ACTIONS.DOWNLOAD_REPORT, countryName)
});

export const selectNRCSectionAnalyticsEvent = createAction('selectNRCsection', null, (sectionSlug) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.CHANGE_NRC_VIEW, sectionSlug)
});

export const openSpeciesListAnalyticsEvent = createAction('openSpeciesList', null, () => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.OPEN_SPECIES_LIST)
});

export const visitCountryReportCardAnalyticsEvent = createAction('visitCountryReportCard', null, (countryName) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.ENTER_COUNTRY, countryName)
});

// Navigation

export const changeMapSceneAnalyticsEvent = createAction('changeMapScene', null, (scene) => {
  return createGtagEventStructure(CATEGORIES.NAVIGATION, ACTIONS.CHANGE_SCENE, scene)
});


export default {
  addLayerAnalyticsEvent,
  removeLayerAnalyticsEvent,
  changeLayerOpacityAnalyticsEvent,
  openInfoModalAnalyticsEvent,
  openHalfEarthMeterAnalyticsEvent,
  openAboutPageAnalyticsEvent,
  enterLandscapeModeAnalyticsEvent,
  changeLayersOrderAnalyticsEvent,
  helpCompleteDatabaseAnalyticsEvent,
  openShareModalAnalyticsEvent,
  exploreCountryFromTooltipAnalyticsEvent,
  exploreCountryFromSearchAnalyticsEvent,
  searchTermsAnalyticsEvent,
  downloadCountryPdfAnalyticsEvent,
  selectNRCSectionAnalyticsEvent,
  openSpeciesListAnalyticsEvent,
  visitCountryReportCardAnalyticsEvent,
}
