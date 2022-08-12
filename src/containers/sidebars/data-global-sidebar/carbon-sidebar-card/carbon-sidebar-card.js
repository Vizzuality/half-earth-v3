import React, { useState, useEffect } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import CarbonSidebarCardComponent from './carbon-sidebar-card-component';
import metadataConfig from 'constants/metadata';
import { CARBON_LAYER } from 'constants/layers-slugs';
import ContentfulService from 'services/contentful';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import mapStateToProps from './carbon-sidebar-card-selectors';

const actions = {...metadataActions, ...urlActions};

const CarbonSidebarCardContainer = (props) => {
  const {
    changeGlobe,
    activeLayers,
  } = props;

  const locale = useLocale();

  const [metadataSource, setMetadataSource] = useState(null);

  useEffect(() => {
    const md = metadataConfig[CARBON_LAYER];
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      if (data) {
        setMetadataSource(data.source);
      }
    })
  }, [locale]);


  const handleLayerToggle = (option, category) => {
    const categoryName = LAYERS_CATEGORIES[category];
    layerManagerToggle(option.value, activeLayers, changeGlobe, categoryName);
  }

  return (
    <CarbonSidebarCardComponent
      handleLayerToggle={handleLayerToggle}
      source={metadataSource}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(CarbonSidebarCardContainer);
