import { analyticsActionCreator } from 'utils/google-analytics-utils';
import { createAction } from 'redux-tools';
import { CATEGORIES, ACTIONS } from 'constants/google-analytics-constants';
const { GENERAL_MENU, DISCOVER_STORIES, EXPLORE_DATA, AOI, NRC } = CATEGORIES;

export const joinConversationAnalytics = (label) => analyticsActionCreator({
  category: GENERAL_MENU,
  action: ACTIONS.SOCIAL,
  label
})

export const shareMapAnalytics = (label) => analyticsActionCreator({
  category: GENERAL_MENU,
  action: ACTIONS.SHARE,
  label
})

export const readStoryAnalytics = (label) => analyticsActionCreator({
  category: DISCOVER_STORIES,
  action: ACTIONS.CLICK_ON_STORY,
  label
})

export const changeTaxaAnalytics = (label) => analyticsActionCreator({
  category: DISCOVER_STORIES,
  action: ACTIONS.CHANGE_TAXA,
  label
})

export const layerToggleAnalytics = (label) => analyticsActionCreator({
  category: EXPLORE_DATA,
  action: ACTIONS.TOGGLE_LAYER,
  label
})

export const shapeUploadSuccessfulAnalytics = () => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.UPLOAD_SHAPE,
  label: 'Upload succesful'
})

export const shapeUploadTooBigAnalytics = () => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.UPLOAD_SHAPE,
  label: 'Shape too big'
})

export const shapeUploadErrorAnalytics = (label) => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.UPLOAD_SHAPE,
  label
})

export const shapeDrawSuccessfulAnalytics = () => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.DRAW_SHAPE,
  label: 'Drawing succesful'
})

export const shapeDrawTooBigAnalytics = () => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.DRAW_SHAPE,
  label: 'Drawing too big'
})

export const aoiHistoryModalOpenAnalytics = (label) => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.OPEN_HISTORY,
  label
})

export const precomputedAoiAnalytics = (label) => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.PRECOMPUTED_AOI,
  label
})

export const shareAoiAnalytics = (label) => analyticsActionCreator({
  category: AOI,
  action: ACTIONS.SHARE_AOI,
  label
})

export const aoiAnalyticsActions = {
  shapeUploadSuccessfulAnalytics,
  shapeUploadTooBigAnalytics,
  shapeUploadErrorAnalytics,
  shapeDrawSuccessfulAnalytics,
  shapeDrawTooBigAnalytics,
  aoiHistoryModalOpenAnalytics,
  precomputedAoiAnalytics,
  shareAoiAnalytics
}

export const clickCountryAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.CLICK_ON_COUNTRY,
  label
})

export const enterNrcAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.ENTER_NRC,
  label
})

export const searchCountryAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.SEARCH_COUNTRY,
  label
})

export const openSpeciesListAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.SPECIES_LIST,
  label
})

export const visitNrcChallengesAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.CHALLENGES,
  label
})

export const visitNrcRankingAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.RANKING,
  label
})

export const visitNrcOverviewAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.OVERVIEW,
  label
}) 

export const downloadNrcPdfAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.DOWNLOAD_PDF,
  label
}) 

export const checkSpiInfoAnalytics = (label) => analyticsActionCreator({
  category: NRC,
  action: ACTIONS.SPI_INFO,
  label
}) 

export const nrcAnalyticsActions = {
  clickCountryAnalytics,
  enterNrcAnalytics,
  searchCountryAnalytics,
  openSpeciesListAnalytics,
  visitNrcChallengesAnalytics,
  visitNrcRankingAnalytics,
  visitNrcOverviewAnalytics,
  downloadNrcPdfAnalytics,
  checkSpiInfoAnalytics,
}

const createGtagEventStructure = (category, action, label) => ({ analytics: { category, action, label }})


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
