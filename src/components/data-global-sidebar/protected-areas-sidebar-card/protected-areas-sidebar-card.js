import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './protected-areas-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchToggleLayers, layerManagerToggle } from 'utils/layer-manager-utils';
import metadataConfig, { MERGED_PROTECTION } from 'constants/metadata';
import metadataService from 'services/metadata-service';
const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const { 
    changeGlobe,
    activeLayers,
  } = props;

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [protectionMetadataSource, setProtectionsMetadataSource] = useState(null);

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION]
    metadataService.getMetadata(md.slug).then( data => {
      setProtectionsMetadataSource(data.source);
    })
  }, []);

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
      selectedLayers={selectedLayers}
      handleLayerToggle={handleLayerToggle}
      source={protectionMetadataSource}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);
