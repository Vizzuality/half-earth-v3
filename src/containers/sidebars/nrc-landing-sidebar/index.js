import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EsriFeatureService from 'services/esri-feature-service';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import metadataConfig, { MERGED_PROTECTION } from 'constants/metadata';
import metadataService from 'services/metadata-service';
const actions = { ...metadataActions, ...urlActions };

const Container = (props) => {
  const {
    changeGlobe,
    activeLayers,
  } = props;

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [protectionMetadataSource, setProtectionsMetadataSource] = useState(null);
  const [globalAverage, setGlobalAverage] = useState({});

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION];
    metadataService.getMetadata(md.slug).then(data => {
      if (data) {
        setProtectionsMetadataSource(data.source);
      }
    })
  }, []);

  // Set global average data
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: COUNTRIES_DATA_SERVICE_URL,
      returnGeometry: true
    }).then((features) => {
      const { attributes } = features[0];
      const { Global_SPI_ter, Global_SPI_mar } = attributes;

      setGlobalAverage({
        landAverage: Global_SPI_ter && Global_SPI_ter.toFixed(),
        marineAverage: Global_SPI_mar && Global_SPI_mar.toFixed(),
      });
    })
  }, [])

  const handleLayerToggle = (option) => {
    if (option.layer === 'all') {
      // batchToggleLayers([selectedLayer, option.layer], activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY)
    } else {
      selectedLayers.find(layer => layer === option.value) ?
        setSelectedLayers(selectedLayers.filter(layer => layer !== option.value)) :
        setSelectedLayers([...selectedLayers, option.value]);
      layerManagerToggle(option.value, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
    }
  }

  return (
    <Component
      globalAverage={globalAverage}
      selectedLayers={selectedLayers}
      handleLayerToggle={handleLayerToggle}
      source={protectionMetadataSource}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);
