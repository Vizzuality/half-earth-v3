import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './human-impact-sidebar-card-component';
import metadataConfig from 'constants/metadata';
import { MARINE_AND_LAND_HUMAN_PRESSURES } from 'constants/layers-slugs';
import metadataService from 'services/metadata-service';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { layerManagerToggle } from 'utils/layer-manager-utils';
const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const { 
    changeGlobe,
    activeLayers,
  } = props;

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [metadataSource, setMetadataSource] = useState(null);

  useEffect(() => {
    const md = metadataConfig[MARINE_AND_LAND_HUMAN_PRESSURES];
    metadataService.getMetadata(md.slug).then( data => {
      setMetadataSource(data.source);
    })
  }, []);


  const handleLayerToggle = (option) => {
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
      source={metadataSource}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);