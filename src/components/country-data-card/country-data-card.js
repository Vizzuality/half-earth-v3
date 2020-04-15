import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { COUNTRIES_DATA_FEATURE_LAYER, COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import mapStateToProps from './country-data-card-selectors';
import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SCENE, GLOBAL_SCENE } from 'constants/view-props';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import countriesListActions from 'redux_modules/countries-list';
import Component from './country-data-card-component';

const actions = { ...urlActions, ...countryDataActions, ...countriesListActions };

const CountryDataCardContainer = (props) => {
  const {
    sceneMode,
    countryISO,
    changeGlobe,
    changeUI,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
    setCountriesListLoading,
    setCountriesListReady,
    setCountriesListError,
    countryData
  } = props;

  const [countriesDataLayer, setCountriesDataLayer] = useState(null);
  const [countriesListLayer, setCountriesListLayer] = useState(null);
  
  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countriesDataLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_DATA_FEATURE_LAYER]
      });
      _countriesDataLayer.outFields = ['*'];
      setCountriesDataLayer(_countriesDataLayer)
    });
  }, [])

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countriesDataLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_LABELS_FEATURE_LAYER]
      });
      _countriesDataLayer.outFields = ['*'];
      setCountriesListLayer(_countriesDataLayer)
    });
  }, [])

  useEffect(() => {
    if (countriesDataLayer) {
      setCountriesListLoading()
      const query = countriesListLayer.createQuery();
      countriesListLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        setCountriesListReady(features);
      })
      .catch((error) => {
        setCountriesListError(error);
      });
    }
  }, [countriesListLayer])

  useEffect(() => {
    if (countriesDataLayer && countryISO && !countryData) {
      setCountryDataLoading();
      const query = countriesDataLayer.createQuery();
      query.where = `GID_0 = '${countryISO}'`;
      countriesDataLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        setCountryDataReady(features);
      })
      .catch((error) => {
        setCountryDataError(error);
      });
    }
  }, [countriesDataLayer, countryISO])

  const handleSceneModeChange = () => {
    changeUI({ sceneMode: sceneMode === GLOBAL_SCENE ? LOCAL_SCENE : GLOBAL_SCENE });
  }
  
  const handleCountryDropdownClick = option => {
    changeGlobe({ countryISO: option.value, countryName: option.name });
  }

  return (
    <Component handleSceneModeChange={handleSceneModeChange} handleCountryDropdownClick={handleCountryDropdownClick} {...props}/>
  )
}

export default connect(mapStateToProps, actions)(CountryDataCardContainer);