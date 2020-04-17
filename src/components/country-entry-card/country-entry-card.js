import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import { setCSSvariable } from 'utils/generic-functions'
import Component from './country-entry-card-component';
import { LOCAL_SCENE, GLOBAL_SCENE } from 'constants/view-props';

const CountryEntryCard = props => {
  const { changeUI, changeGlobe, sceneMode, countryName } = props;

  useEffect(() => {
    if (countryName) {
      setCSSvariable('--sidebar-top-margin', '20px');
    }
  }, [])
  
  const handleSceneModeChange = () => changeUI({ sceneMode: sceneMode === GLOBAL_SCENE ? LOCAL_SCENE : GLOBAL_SCENE });
  const handleCountryDeselect = () => {
    changeGlobe({ countryISO: null, countryName: null })
    setCSSvariable('--sidebar-top-margin', '60px');
  };

  return (
    <Component
       handleSceneModeChange={handleSceneModeChange}
       handleCountryDeselect={handleCountryDeselect}
       {...props}
    />
  );
}

export default connect(null, actions)(CountryEntryCard);