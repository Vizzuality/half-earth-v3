import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER as layerSlug } from 'constants/layers-slugs';
import { useFeatureLayer } from 'hooks/esri';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';
import * as urlActions from 'actions/url-actions';
import Component from './country-entry-tooltip-component';

const CountryEntryTooltipContainer = props => {
  const { countryTooltip } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const countryCentroidsLayer = useFeatureLayer({ layerSlug, outFields: ["NAME_0"] });

  const queryCountryCentroid = ({ countryCentroidsLayer, countryTooltip }) => {
    const query = countryCentroidsLayer.createQuery();
    query.where = `GID_0 = '${countryTooltip}'`;
    query.returnGeometry = true;
    countryCentroidsLayer.queryFeatures(query)
      .then((results) => {
        const { features } = results;
        const { geometry } = features[0];
        setTooltipPosition(geometry.centroid);
      })
  };


  useEffect(() => {
    if (countryCentroidsLayer && countryTooltip) {
      queryCountryCentroid({countryCentroidsLayer, countryTooltip});
    }
  }, [countryCentroidsLayer, countryTooltip])


  const handleTooltipClose = () => {
    const { changeGlobe } = props;
    changeGlobe({countryTooltip: null})
  }

  const handleSceneModeChange = () => {
    const { changeGlobe, changeUI,sceneMode } = props;
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