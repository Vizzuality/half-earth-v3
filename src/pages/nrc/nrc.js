import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import mapStateToProps from './nrc-selectors';
import NrcComponent from './nrc-component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
// Services
import EsriFeatureService from 'services/esri-feature-service';
// Constants
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { NRC_TERRESTRIAL_SPI_DATA_LAYER, NRC_MARINE_SPI_DATA_LAYER } from 'constants/layers-urls';
// Actions
import countryDataActions from 'redux_modules/country-data';
import * as urlActions from 'actions/url-actions';

const actions = { ...countryDataActions, ...urlActions };

function NrcContainer(props) {
  const {
    countryISO,
    setCountryDataLoading,
    setCountryDataReady,
    setCountryDataError,
  } = props;

  // Get countries data on mount
  useEffect(() => {
    setCountryDataLoading();
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
    }).then((features) => {
      setCountryDataReady(features);
    }).catch((error) => {
      setCountryDataError(error);
    });
  }, []);

  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({ map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER] });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  const [chartLandData, setChartLandData] = useState(null);
  const [chartMarineData, setChartMarineData] = useState(null);
  useEffect(() => {
    if (countryISO) {
      EsriFeatureService.getFeatures({
        url: NRC_TERRESTRIAL_SPI_DATA_LAYER,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: false,
      }).then((data) => {
        if (data && data.length > 0) {
          setChartLandData(data.map((r) => r.attributes));
        }
      });
      EsriFeatureService.getFeatures({
        url: NRC_MARINE_SPI_DATA_LAYER,
        whereClause: `GID_0 = '${countryISO}'`,
        returnGeometry: false,
      }).then((data) => {
        if (data && data.length > 0) {
          setChartMarineData(data.map((r) => r.attributes));
        }
      });
    }
  }, [countryISO]);

  return (
    <NrcComponent
      chartData={{ land: chartLandData, marine: chartMarineData }}
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcContainer);
