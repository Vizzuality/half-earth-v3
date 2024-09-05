import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';
import EsriFeatureService from 'services/esri-feature-service';
import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../utils/layer-manager-utils.js';
import * as urlActions from 'actions/url-actions';
import countryDataActions from 'redux_modules/country-data';
import DashboardSpeciesNameComponent from './dashboard-species-name-component';
import mapStateToProps from './dashboard-species-name-selectors';

import {
  COUNTRIES_DATA_SERVICE_URL
} from 'constants/layers-urls';

const actions = { ...countryDataActions, ...urlActions };

function DashboardSpeciesNameContainer(props) {
  const {
    viewSettings,
    countryISO,
    scientificName,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
  } = props;

  const [geometry, setGeometry] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);

  // Get Country information, allows to get country name
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      whereClause: `GID_0 = '${countryISO}'`,
      returnGeometry: true,
    })
      .then((features) => {
        const { geometry } = features[0];

        setCountryDataReady(features);
        if (geometry) {
          setGeometry(geometry);
        }

      })
      .catch((error) => {
        setCountryDataError(error);
      });
  }, []);

  useEffect(() => {
    if (scientificName) {
      getSpeciesData();
    }
  }, [scientificName]);

  const getSpeciesData = async () => {
    const url = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/species/info?lang=en&scientificname=${scientificName}`;
    const response = await fetch(url);
    const data = await response.json();
    setSpeciesInfo(data[0]);
  }

  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: viewSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return <DashboardSpeciesNameComponent
    handleMapLoad={handleMapLoad}
    geometry={geometry}
    speciesInfo={speciesInfo}
    {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardSpeciesNameContainer);
