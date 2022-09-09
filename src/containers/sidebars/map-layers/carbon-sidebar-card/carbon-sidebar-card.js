import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { layerManagerToggle } from 'utils/layer-manager-utils';

import ContentfulService from 'services/contentful';

import { CARBON_LAYER } from 'constants/layers-slugs';
import metadataConfig from 'constants/metadata';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import CarbonSidebarCardComponent from './carbon-sidebar-card-component';
import mapStateToProps from './carbon-sidebar-card-selectors';

const actions = { ...metadataActions, ...urlActions };

function CarbonSidebarCardContainer(props) {
  const {
    activeLayers,
    changeGlobe,
  } = props;

  const locale = useLocale();

  const [metadataSource, setMetadataSource] = useState(null);

  useEffect(() => {
    const md = metadataConfig[CARBON_LAYER];
    ContentfulService.getMetadata(md.slug, locale).then((data) => {
      if (data) {
        setMetadataSource(data.source);
      }
    });
  }, [locale]);

  const handleLayerToggle = (option, category) => {
    const categoryName = LAYERS_CATEGORIES[category];
    layerManagerToggle(option.value, activeLayers, changeGlobe, categoryName);
  };

  return (
    <CarbonSidebarCardComponent
      handleLayerToggle={handleLayerToggle}
      source={metadataSource}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(CarbonSidebarCardContainer);
