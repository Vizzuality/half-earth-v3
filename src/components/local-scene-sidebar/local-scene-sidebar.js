import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import dataSceneConfig from 'scenes/data-scene/data-scene-config';
import { setCSSvariable } from 'utils/generic-functions'
import mapStateToProps from './local-scene-sidebar-selectors';
import Component from './local-scene-sidebar-component';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import countriesListActions from 'redux_modules/countries-list';

const actions = { ...urlActions, ...countryDataActions, ...countriesListActions };

const LocalSceneSidebarContainer = (props) => {
  const {
    changeUI,
    sceneMode,
    changeGlobe
  } = props;

  useEffect(() => {
    setCSSvariable('--sidebar-top-margin', '20px');
  }, [])

  const handleSceneModeChange = () => {
    changeUI({ sceneMode: sceneMode === DATA_SCENE ? LOCAL_SCENE : DATA_SCENE });
    changeGlobe({countryISO: null, countryName: null, activeLayers: dataSceneConfig.globe.activeLayers, zoom: 7});
  }

  return (
    <Component
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);