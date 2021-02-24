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
import { downloadCountryPdfAnalyticsEvent, selectNRCSectionAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...urlActions, ...countryDataActions, downloadCountryPdfAnalyticsEvent };

const LocalSceneSidebarContainer = (props) => {
  const {
    changeUI,
    sceneMode,
    changeGlobe,
    countryName,
    downloadCountryPdfAnalyticsEvent
  } = props;

  useEffect(() => {
    setCSSvariable('--sidebar-top-margin', '20px');
  }, [])

  const handleSceneModeChange = () => {
    changeUI({ sceneMode: sceneMode === DATA_SCENE ? LOCAL_SCENE : DATA_SCENE, localSceneActiveTab: LOCAL_SCENE_TABS.MAP });
    changeGlobe({countryISO: null, countryName: null, activeLayers: dataSceneConfig.globe.activeLayers, zoom: 7});
    setCSSvariable('--sidebar-top-margin', '60px');
  }

  const handleTabSelection = slug => {
    const { changeUI } = props;
    changeUI({ localSceneActiveTab: slug });
    selectNRCSectionAnalyticsEvent(slug);
  };

  const handlePrintReport = () => {
    const today = new Date();
    const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(today);
    const tempTitle = document.title;
    document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
    window.print();
    downloadCountryPdfAnalyticsEvent(countryName)
    document.title = tempTitle;
  }

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleTabSelection={handleTabSelection}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);