/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import { layerToggleAnalytics } from 'actions/google-analytics-actions';

import { bringLayerToFront, bringLayerToBack } from 'utils/layer-manager-utils';
import { handleMetadataClick } from 'utils/metadata-utils';

import Component from './component';

const actions = { ...metadataActions, layerToggleAnalytics };

function LayerToggle(props) {
  const { map, activeLayers, option } = props;
  const [isChecked, setIsChecked] = useState(false);
  const locale = useLocale();

  const handleInfoClick = (o) => {
    const { setModalMetadata } = props;
    handleMetadataClick({ option: o, setModalMetadata, locale });
  };

  const handleBringToBackClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  };

  const handleBringToFrontClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  };

  useEffect(() => {
    const _isChecked = activeLayers.some(
      (layer) => layer.title === option.value
    );
    setIsChecked(_isChecked);
    const { layerToggleAnalytics: layerToggleAnalyticsAction } = props;
    if (_isChecked) {
      layerToggleAnalyticsAction(option.value);
    }
  }, [activeLayers]);

  return (
    <Component
      isChecked={isChecked}
      handleInfoClick={handleInfoClick}
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      {...props}
    />
  );
}

export default connect(null, actions)(LayerToggle);
