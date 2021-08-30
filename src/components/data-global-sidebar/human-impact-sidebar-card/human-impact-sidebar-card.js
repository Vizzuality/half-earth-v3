import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './human-impact-sidebar-card-component';
import { LAYERS_CATEGORIES, layersConfig } from 'constants/mol-layers-configs';
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
    if (option.layer === 'all') {
      // batchToggleLayers([selectedLayer, option.layer], activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY)
    } else {
      selectedLayers.find(layer => layer === option.value) ?
        setSelectedLayers(selectedLayers.filter(layer => layer !== option.value)) :
        setSelectedLayers([...selectedLayers, option.value]);
      layerManagerToggle(option.value, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
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