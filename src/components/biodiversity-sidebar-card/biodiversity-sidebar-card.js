import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchLayerManagerToggle } from 'utils/layer-manager-utils';

const mapStateToProps = (state) => ({
  biodiversityLayerType:
    state.location.query &&
    state.location.query.ui &&
    state.location.query.ui.biodiversityLayerType
});

const BiodiversitySidebarCard = (props)  => {
  const { changeGlobe, activeLayers } = props;
  const handleClearAndAddLayers = (layerIds) => {
    const bioLayers = activeLayers.filter(
      (l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY
    );
    batchLayerManagerToggle(
      bioLayers.map((l) => l.title).concat(layerIds),
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