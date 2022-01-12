import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './component';
import { AOI_LEGEND_CATEGORIES, SIDEBAR_CARDS_CONFIG } from 'constants/analyze-areas-constants';
import { layerManagerToggle, batchToggleLayers } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';

const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const {
    contextualData,
    toggleType,
    changeGlobe,
    activeLayers,
    cardCategory,
  } = props;

  const [selectedLayer, setSelectedLayer] = useState(null);
  const [cardDescription, setCardDescription] = useState(null);
  const [protectedAreasModalOpen, setProtectedAreasModalOpen] = useState(false);
  const { description, title } = SIDEBAR_CARDS_CONFIG[cardCategory];

  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      setCardDescription(description(contextualData));
    }
  }, [contextualData])

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

  const handleAllProtectedAreasClick = () => {
    setProtectedAreasModalOpen(true);
  }

  const handleProtectedAreasModalToggle = () => {
    setProtectedAreasModalOpen(!protectedAreasModalOpen);
  }

  return (
    <Component
      cardTitle={title}
      cardDescription={cardDescription}
      hasLegend={AOI_LEGEND_CATEGORIES.some(c => c === cardCategory)}
      onChange={toggleType === 'radio' ? radioTypeToggle : checkboxTypeToggle}
      handleAllProtectedAreasClick={handleAllProtectedAreasClick}
      handleProtectedAreasModalToggle={handleProtectedAreasModalToggle}
      isProtectedAreasModalOpen={protectedAreasModalOpen}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);
