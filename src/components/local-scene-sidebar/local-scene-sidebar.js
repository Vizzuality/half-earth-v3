import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import { LOCAL_SCENE_TABS } from 'constants/ui-params';
import dataSceneConfig from 'scenes/data-scene/data-scene-config';
import { setCSSvariable } from 'utils/generic-functions'
import mapStateToProps from './local-scene-sidebar-selectors';
import Component from './local-scene-sidebar-component';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';

const actions = { ...urlActions, ...countryDataActions };

const LocalSceneSidebarContainer = (props) => {
  const {
    view,
    changeUI,
    sceneMode,
    changeGlobe,
    localGeometry
  } = props;

  useEffect(() => {
    setCSSvariable('--sidebar-top-margin', '20px');
  }, [])

  const handleSceneModeChange = () => {
    changeUI({ sceneMode: sceneMode === DATA_SCENE ? LOCAL_SCENE : DATA_SCENE, localSceneActiveTab: LOCAL_SCENE_TABS.MAP });
    changeGlobe({countryISO: null, countryName: null, activeLayers: dataSceneConfig.globe.activeLayers, zoom: 7});
    setCSSvariable('--sidebar-top-margin', '60px');
  }

  const handlePrintReport = () => {
    const { extent } = localGeometry;
    view.goTo({ target: extent, tilt: 0, heading: 0 })
        .then(() => window.print())
        .catch(() => window.print())
  }

  const handleShareReport = () => {

  }

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleShareReport={handleShareReport}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);