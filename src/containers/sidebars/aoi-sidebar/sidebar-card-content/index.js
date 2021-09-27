import React, { useState } from 'react';
import { connect } from 'react-redux';
import Component from './component';
import { layerManagerToggle, batchToggleLayers } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const { 
    toggleType,
    changeGlobe,
    activeLayers,
  } = props;
  
  const [selectedLayer, setSelectedLayer] = useState(null);

  const radioTypeToggle = (option) => {
    if (selectedLayer === option.slug) {
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      setSelectedLayer(null);
    } else if(selectedLayer) {
      batchToggleLayers([selectedLayer, option.slug], activeLayers, changeGlobe)
      setSelectedLayer(option.slug);
    } else {
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      setSelectedLayer(option.slug);
    }
  }

  const checkboxTypeToggle = (option) => {
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  }

  return (
    <Component 
      onChange={toggleType === 'radio' ? radioTypeToggle : checkboxTypeToggle}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);
