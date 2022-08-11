import React, { useState, useEffect } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux'
import Component from './component';
import metadataActions from 'redux_modules/metadata';
import { layerToggleAnalytics } from 'actions/google-analytics-actions';

import { bringLayerToFront, bringLayerToBack } from 'utils/layer-manager-utils';

const actions = { ...metadataActions, layerToggleAnalytics };

const LayerToggle = (props) => {
  const { map, activeLayers, option } = props;
  const [isChecked, setIsChecked] = useState(false)
  const locale = useLocale();

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${option.slug || option.value}`,
      locale,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true
    });
  }

  const handleBringToBackClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  }

  const handleBringToFrontClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  }

  useEffect(() => {
    const _isChecked = activeLayers.some(layer => layer.title === option.value);
    setIsChecked(_isChecked);
    if (_isChecked) { props.layerToggleAnalytics(option.value) }
  }, [activeLayers])

  return (
    <Component
      isChecked={isChecked}
      handleInfoClick={handleInfoClick}
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      {...props}
    />
  )
}

export default connect(null, actions)(LayerToggle);
