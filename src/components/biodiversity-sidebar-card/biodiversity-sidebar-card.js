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
      title: 'WHERE TO START TO PROTECT?',
      description: 'The priority layer indicates the minimum amount of additional global conservation needed to protect the bulk of terrestrial vertebrate biodiversity, with locations identified via spatial conservation planning. It presents one possible pathway of many toward comprehensive terrestrial biodiversity conservation. Locations with higher values indicate places of higher priority for conservation that contribute more to the safeguarding of species habitat.',
      source: 'Rinnan DS and Jetz W, (2020).'
    },
    [BIODIVERSITY_TABS_SLUGS.RICHNESS] : {
      title: 'WHAT DOES RICHNESS MEAN?',
      description: 'How many species compose a site? Species richness is a measure of the number of different species in a given region. This quantity can be summarized by distinct geographic regions such as countries or protected areas, or by equal-area grids to reveal global patterns.',
      source: 'Map Of Life, (Yale University).'
    },
    [BIODIVERSITY_TABS_SLUGS.RARITY] : {
      title: 'WHAT DOES RARITY MEAN?',
      description: 'How unique is the composition in species of a site? Species rarity is the proportion of the distribution of a species that is found in a given region, averaged across all species in that region. It is a measure of the average geographic range-restrictedness of species. This is also known as average range-size rarity or simply range size rarity.',
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