import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import Component from './country-entry-card-component';
import { LOCAL_SCENE, GLOBAL_SCENE } from 'constants/view-props';

const CountryEntryCard = props => {
  const { changeUI, changeGlobe, sceneMode } = props;
  const handleSceneModeChange = () => changeUI({ sceneMode: sceneMode === GLOBAL_SCENE ? LOCAL_SCENE : GLOBAL_SCENE });
  const handleCountryDeselect = () => changeGlobe({ countryISO: null, countryName: null });

  return (
    <Component
       handleSceneModeChange={handleSceneModeChange}
       handleCountryDeselect={handleCountryDeselect}
       {...props}
    />
  );
}

export default connect(null, actions)(CountryEntryCard);