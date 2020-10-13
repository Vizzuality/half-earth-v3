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
    countryName,
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
        .then(() => {
          const today = new Date();
          const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(today);
          const tempTitle = document.title;
          document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
          window.print();
          document.title = tempTitle;
        })
        .catch(() => window.print())
  }

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);