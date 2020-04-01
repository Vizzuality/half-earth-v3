import { createSelector, createStructuredSelector } from 'reselect';
import { getDataGlobeLayers } from 'selectors/layers-selectors';
import { selectGlobeUrlState, selectListenersState } from 'selectors/location-selectors';
import initialState from './map-iframe-initial-state';
import sceneSettings from './map-iframe-settings';

const getGlobeSettings = createSelector(selectGlobeUrlState, globeUrlState => {
  return {
    ...initialState.globe,
    ...globeUrlState
  }
})

const getListenersSetting = createSelector(selectListenersState, listenersUrlState => {
  return listenersUrlState ? listenersUrlState : initialState.listeners;
})

const getSceneSettings = createSelector(getGlobeSettings, globeSettings => {
  return {
    ...sceneSettings,
    zoom: globeSettings.zoom,
    center: globeSettings.center
  }
})

const getPledgesActiveQuery = ({ location }) => location.query && (location.query.isPledgesActive || initialState.isPledgesActive);
const getSignedPledgeZIP = ({ location }) => location.query && (location.query.signedPledgeZIP);
const getSignedPledgeCountry = ({ location }) => location.query && (location.query.signedPledgeCountry);

export const getActiveLayers = createSelector(getGlobeSettings, globeSettings => globeSettings.activeLayers)
const getLandscapeMode = createSelector(getGlobeSettings, globeSettings => globeSettings.landscapeView)
const getGlobeUpdating = createSelector(getGlobeSettings, globeSettings => globeSettings.isGlobeUpdating)
const getPledgesActive = createSelector(getPledgesActiveQuery, pledgesActiveQuery => pledgesActiveQuery)

export default createStructuredSelector({
  sceneLayers: getDataGlobeLayers,
  activeLayers: getActiveLayers,
  isLandscapeMode: getLandscapeMode,
  sceneSettings: getSceneSettings,
  isGlobeUpdating: getGlobeUpdating,
  isPledgesActive: getPledgesActive,
  signedPledgeZIP: getSignedPledgeZIP,
  signedPledgeCountry: getSignedPledgeCountry,
  listeners: getListenersSetting
})