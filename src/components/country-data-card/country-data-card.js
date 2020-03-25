import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import Component from './country-data-card-component';

const CountryDataCardContainer = (props) => {
  const { sceneMode, changeUI } = props;
  const handleSceneModeChange = () => {
    changeUI({ sceneMode: sceneMode === 'global' ? 'local' : 'global', selectedCountry: false });
  }
  return (
    <Component handleSceneModeChange={handleSceneModeChange}{...props} />
  )
}

export default connect(null, actions)(CountryDataCardContainer);