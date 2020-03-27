
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import Component from './country-entry-card-component';

const CountryEntryCard = props => {
  const { changeUI, changeGlobe, sceneMode } = props;
  const handleSceneModeChange = () => changeUI({ sceneMode: sceneMode === 'global' ? 'local' : 'global' });
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