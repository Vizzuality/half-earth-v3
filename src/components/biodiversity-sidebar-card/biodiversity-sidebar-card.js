import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import metadataService from 'services/metadata-service';
import isEmpty from 'lodash/isEmpty';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/layers-config';
import { batchToggleLayers } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';
import { biodiversityCategories } from 'constants/layers-config';
import { useSelectLayersOnTabChange } from './biodiversity-sidebar-card-hooks';
import { BIODIVERSITY_TABS_SLUGS } from 'constants/ui-params';
const actions = {...metadataActions, ...urlActions};
const BiodiversitySidebarCard = (props)  => {
  const { changeGlobe, changeUI, activeLayers, biodiversityLayerVariant } = props;
  const { PRIORITY, RICHNESS, RARITY } = BIODIVERSITY_TABS_SLUGS;
  const [cardMetadata, setCardMetadata] = useState({
    [PRIORITY] : {},
    [RICHNESS] : {},
    [RARITY] : {},
  })

  useEffect(() => {
    if (isEmpty(cardMetadata[biodiversityLayerVariant])) {
      metadataService.getMetadata(biodiversityLayerVariant).then( data => {
        setCardMetadata({
          ...cardMetadata,
          [biodiversityLayerVariant]: {
            ...data
          }
        });
      })
    }
  }, [biodiversityLayerVariant]);

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
      cardMetadata={cardMetadata[biodiversityLayerVariant]}
      {...props}
    />
  );
};
export default connect(mapStateToProps, actions)(BiodiversitySidebarCard);