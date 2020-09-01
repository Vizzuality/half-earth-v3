import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import Component from './country-scene-component';
import countriesGeometriesActions from 'redux_modules/countries-geometries';
import countryDataActions from 'redux_modules/country-data';

import {
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER
 } from 'constants/layers-slugs';

import { LAYERS_URLS } from 'constants/layers-urls';
import mapStateToProps from './country-scene-selectors';

const actions = {...countriesGeometriesActions, ...countryDataActions }
const CountrySceneContainer = (props) => {
  const {
    countryISO,
    countriesData,
    countryBorder,
    setCountryBorderReady,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError
  } = props;

  const [countryLayer, setCountryLayer] = useState(null);
  const [countriesDataLayer, setCountriesDataLayer] = useState(null);

  const setCountryGeometries = () => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    query.outSpatialReference = 102100;
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        setCountryBorderReady({ iso: countryISO, borderGraphic: geometry });
      })
  };

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      setCountryLayer(_countryLayer)
      const _countriesDataLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_DATA_FEATURE_LAYER]
      });
      _countriesDataLayer.outFields = ['*'];
      setCountriesDataLayer(_countriesDataLayer)
    });
  }, []);

  useEffect(() => {
    if (countryLayer && countryISO && !countryBorder) {
      setCountryGeometries();
    }
  }, [countryLayer, countryISO, countryBorder]);


  useEffect(() => {
    if (countriesDataLayer && !countriesData) {
      setCountryDataLoading();
      const query = countriesDataLayer.createQuery();
      countriesDataLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        setCountryDataReady(features);
      })
      .catch((error) => {
        setCountryDataError(error);
      });
    }
  }, [countriesDataLayer, countriesData])


  return (
    <Component {...props}/>
  )
}

export default connect(mapStateToProps, actions)(CountrySceneContainer);