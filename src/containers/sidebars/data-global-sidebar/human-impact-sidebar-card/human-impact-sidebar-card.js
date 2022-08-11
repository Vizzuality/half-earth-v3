import React, { useState, useEffect } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import Component from './human-impact-sidebar-card-component';
import metadataConfig from 'constants/metadata';
import { MARINE_AND_LAND_HUMAN_PRESSURES } from 'constants/layers-slugs';
import ContentfulService from 'services/contentful';
import { layerManagerToggle, batchToggleLayers} from 'utils/layer-manager-utils';
import { LEGEND_GROUPED_LAYERS_GROUPS } from 'constants/layers-groups';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import mapStateToProps from './human-impact-sidebar-card-selectors';

const actions = {...metadataActions, ...urlActions};

const Container = (props) => {
  const {
    changeGlobe,
    activeLayers,
  } = props;

  const [metadataSource, setMetadataSource] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    const md = metadataConfig[MARINE_AND_LAND_HUMAN_PRESSURES];
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      if (data) {
        setMetadataSource(data.source);
      }
    })
  }, [locale]);


  const handleLayerToggle = (option, category) => {
    const categoryName = LAYERS_CATEGORIES[category];
    if (option.layer === 'none') {
      const allHumanPressuresLayerTitles = activeLayers.map(l => (l.category === categoryName) ? l.title : null).filter(Boolean);
      batchToggleLayers(allHumanPressuresLayerTitles, activeLayers, changeGlobe, categoryName)
    } else if (option.layer === 'all') {
      const allCategorySlugs = LEGEND_GROUPED_LAYERS_GROUPS[category];
      const nonActiveHumanLayers = allCategorySlugs.filter(slug => !activeLayers.some(l => l.title === slug));
      batchToggleLayers(nonActiveHumanLayers, activeLayers, changeGlobe, categoryName)
    } else {
      layerManagerToggle(option.value, activeLayers, changeGlobe, categoryName);
    }
  }

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      source={metadataSource}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(Container);
