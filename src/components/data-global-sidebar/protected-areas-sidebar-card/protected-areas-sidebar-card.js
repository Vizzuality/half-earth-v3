import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './protected-areas-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchToggleLayers, layerManagerToggle } from 'utils/layer-manager-utils';
const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const { 
    changeGlobe,
    activeLayers,
  } = props;

  const [selectedLayers, setSelectedLayers] = useState([]);

  const handleLayerToggle = (e, option) => {
    e.preventDefault();
    console.log(option)
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
      {...props}
    />
  )
}

export default connect(null, actions)(Container);