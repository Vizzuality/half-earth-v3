/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import * as urlActions from 'actions/url-actions';

import { layerManagerToggle } from 'utils/layer-manager-utils';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './component';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const {
    changeGlobe,
    activeLayers,
  } = props;

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [globalAverage, setGlobalAverage] = useState({});

  // Set global average data
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      returnGeometry: true,
    }).then((features) => {
      const { attributes } = features[0];
      const { Global_SPI_ter, Global_SPI_mar } = attributes;
      const formatValue = (value) => (
        value > 1 || value === 0 ? value.toFixed() : value.toFixed(1)
      );
      setGlobalAverage({
        landAverage: Global_SPI_ter && formatValue(parseFloat(Global_SPI_ter)),
        marineAverage: Global_SPI_mar && formatValue(parseFloat(Global_SPI_mar)),
      });
    });
  }, []);

  const handleLayerToggle = (option) => {
    if (option.layer === 'all') {
      // batchToggleLayers([selectedLayer, option.layer], activeLayers,
      // changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY)
    } else {
      if (selectedLayers.find((layer) => layer === option.value)) {
        setSelectedLayers(selectedLayers.filter((layer) => layer !== option.value));
      } else {
        setSelectedLayers([...selectedLayers, option.value]);
      }
      layerManagerToggle(option.value, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      globalAverage={globalAverage}
      selectedLayers={selectedLayers}
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  );
}

export default connect(null, actions)(Container);
