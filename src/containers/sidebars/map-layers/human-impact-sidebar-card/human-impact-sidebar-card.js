import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import {
  layerManagerToggle,
  batchToggleLayers,
} from 'utils/layer-manager-utils';

import ContentfulService from 'services/contentful';

import { LEGEND_GROUPED_LAYERS_GROUPS } from 'constants/layers-groups';
import {
  LAND_HUMAN_PRESSURES,
  MARINE_HUMAN_PRESSURES,
} from 'constants/layers-slugs';
import metadataConfig from 'constants/metadata';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './human-impact-sidebar-card-component';
import mapStateToProps from './human-impact-sidebar-card-selectors';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const { changeGlobe, activeLayers } = props;

  const [marineMetadataSource, setMarineMetadataSource] = useState(null);
  const [landMetadataSource, setLandMetadataSource] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[MARINE_HUMAN_PRESSURES],
      locale
    ).then((data) => {
      if (data) {
        setMarineMetadataSource(data.source);
      }
    });
  }, [locale]);

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[LAND_HUMAN_PRESSURES],
      locale
    ).then((data) => {
      if (data) {
        setLandMetadataSource(data.source);
      }
    });
  }, [locale]);

  const handleLayerToggle = (option, category) => {
    const categoryName = LAYERS_CATEGORIES[category];
    if (option.layer === 'none') {
      const allHumanPressuresLayerTitles = activeLayers
        .map((l) => (l.category === categoryName ? l.title : null))
        .filter(Boolean);
      batchToggleLayers(
        allHumanPressuresLayerTitles,
        activeLayers,
        changeGlobe,
        categoryName
      );
    } else if (option.layer === 'all') {
      const allCategorySlugs = LEGEND_GROUPED_LAYERS_GROUPS[category];
      const nonActiveHumanLayers = allCategorySlugs.filter(
        (slug) => !activeLayers.some((l) => l.title === slug)
      );
      batchToggleLayers(
        nonActiveHumanLayers,
        activeLayers,
        changeGlobe,
        categoryName
      );
    } else {
      layerManagerToggle(option.value, activeLayers, changeGlobe, categoryName);
    }
  };

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      landSource={landMetadataSource}
      marineSource={marineMetadataSource}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
