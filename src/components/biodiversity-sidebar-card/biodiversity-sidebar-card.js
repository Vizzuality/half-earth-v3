import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchLayerManagerToggle } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';

const BiodiversitySidebarCard = (props)  => {
  const { changeGlobe, activeLayers } = props;

  const handleClearAndAddLayers = (bioLayerIds, layerIds) => {
    batchLayerManagerToggle(
      bioLayerIds.concat(layerIds),
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.BIODIVERSITY
    );
  };

  return (
    <Component
      handleClearAndAddLayers={handleClearAndAddLayers}
      {...props}
    />
  );
};
export default connect(mapStateToProps, urlActions)(BiodiversitySidebarCard);