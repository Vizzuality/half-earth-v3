import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import Component from './country-scene-component';
import actions from 'redux_modules/country-extent';

import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';


const CountrySceneContainer = (props) => {

  const { countryISO, setCountryExtentLoading, setCountryExtentReady, setCountryExtentError } = props;

  const [countryLayer, setCountryLayer] = useState(null);

  const createExtent = () => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    query.outSpatialReference = 102100;
    setCountryExtentLoading();
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        setCountryExtentReady(geometry.extent);
      })
      .catch((error) => {
        setCountryExtentError()
        console.warn(error);
      });
  };

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      setCountryLayer(_countryLayer)
    });
  }, []);

  useEffect(() => {
    if (countryLayer && countryISO) {
      createExtent();
    }
  }, [countryLayer, countryISO]);


  return (
    <Component {...props}/>
  )
}

export default connect(null, actions)(CountrySceneContainer);