import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { batchToggleLayers } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import { useSelectLayersOnTabChange } from './biodiversity-sidebar-card-hooks';
import { BIODIVERSITY_TABS_SLUGS } from 'constants/ui-params';

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

  // This should be replaced with fetched metadata. Update the heights on the styles if needed
  const mockedMetadata = {
    [BIODIVERSITY_TABS_SLUGS.PRIORITY] : {
      title: 'WHERE TO PROTECT?',
      description: 'The brightly colored map layer indicates the minimum amount of additional conservation area needed for Peru to achieve a National SPI of 100, and presents one possible pathway toward the Half-Earth goal of comprehensive terrestrial biodiversity conservation. Higher values indicate locations within the country that contribute more to the conservation of species habitat',
      source: 'Rinnan DS and Jetz W, (2020).'
    },
    [BIODIVERSITY_TABS_SLUGS.RICHNESS] : {
      title: 'WHAT DOES RICHNESS MEAN?',
      description: 'Richness: How many species compose a site? The higher the number of species in a site, the higher its richness.',
      source: 'Map Of Life, (Yale University).'
    },
    [BIODIVERSITY_TABS_SLUGS.RARITY] : {
      title: 'WHAT DOES RARITY MEAN?',
      description: 'How unique is the composition in species of a site? The more species unique to a site, i.e. not found anywhere else in the world, the higher the rarity of the site.',
      source: 'Map Of Life, (Yale University).'
    },
  }[biodiversityLayerVariant];

  return (
    <Component
      handleClearAndAddLayers={handleClearAndAddLayers}
      handleTabSelection={handleTabSelection}
      cardMetadata={mockedMetadata}
      {...props}
    />
  );
};
export default connect(mapStateToProps, urlActions)(BiodiversitySidebarCard);