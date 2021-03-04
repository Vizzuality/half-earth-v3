import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchToggleLayers } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import { useSelectLayersOnTabChange } from './biodiversity-sidebar-card-hooks';

const BiodiversitySidebarCard = (props)  => {
  const { changeGlobe, changeUI, activeLayers, biodiversityLayerVariant } = props;

  const handleTabSelection = (slug) => {
    changeUI({ biodiversityLayerVariant: slug });
  };

  const handleClearAndAddLayers = (bioLayerIds, layerIds) => {
    batchToggleLayers(
      bioLayerIds.concat(layerIds),
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.BIODIVERSITY
    );
  };

  useSelectLayersOnTabChange({
    biodiversityLayerVariant,
    activeLayers,
    biodiversityCategories,
    handleClearAndAddLayers
  });

  return (
    <Component
      handleClearAndAddLayers={handleClearAndAddLayers}
      handleTabSelection={handleTabSelection}
      {...props}
    />
  );
};
export default connect(mapStateToProps, urlActions)(BiodiversitySidebarCard);