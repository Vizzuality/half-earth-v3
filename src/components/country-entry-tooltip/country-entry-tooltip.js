import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';
import * as urlActions from 'actions/url-actions';
import Component from './country-entry-tooltip-component';

const CountryEntryTooltipContainer = props => {
  const { countryISO } = props;
  const [tooltipPosition, setTooltipPosition] = useState(null);

  // Set country tooltip position
  useEffect(() => {
    if (countryISO) {
      EsriFeatureService.getFeatures({
        url: COUNTRIES_DATA_SERVICE_URL,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: true
      }).then((features) => {
        const { geometry } = features[0];
        setTooltipPosition(geometry);
      })
    }
  }, [countryISO])

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