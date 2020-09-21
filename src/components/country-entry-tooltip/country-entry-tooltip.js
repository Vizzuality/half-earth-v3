import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER as layerSlug } from 'constants/layers-slugs';
import { useFeatureLayer } from 'hooks/esri';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';
import * as urlActions from 'actions/url-actions';
import Component from './country-entry-tooltip-component';

const CountryEntryTooltipContainer = props => {
  const { countryISO } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const countryCentroidsLayer = useFeatureLayer({ layerSlug, outFields: ["NAME_0"] });

  const queryCountryCentroid = ({ countryCentroidsLayer, countryISO }) => {
    const query = countryCentroidsLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    query.returnGeometry = true;
    countryCentroidsLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        const { geometry } = features[0];
        setTooltipPosition(geometry.centroid);
      })
  };


  useEffect(() => {
    if (countryCentroidsLayer && countryISO) {
      queryCountryCentroid({countryCentroidsLayer, countryISO});
    }
  }, [countryCentroidsLayer, countryISO])


  const handleTooltipClose = () => {
    const { changeGlobe } = props;
    changeGlobe({countryISO: null})
  }

  const handleSceneModeChange = () => {
    const { changeGlobe, changeUI, sceneMode } = props;
    changeGlobe({ activeLayers: countrySceneConfig.globe.activeLayers })
    changeUI({ sceneMode: sceneMode === DATA_SCENE ? LOCAL_SCENE : DATA_SCENE })
  };

  return (
    <Component
      tooltipPosition={tooltipPosition}
      handleTooltipClose={handleTooltipClose}
      handleExploreCountryClick={handleSceneModeChange}
      {...props}
    />
  )
}

export default connect(null, urlActions)(CountryEntryTooltipContainer);