import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { layerManagerToggle } from 'utils/layer-manager-utils';

import ContentfulService from 'services/contentful';

import metadataConfig, { MERGED_PROTECTION } from 'constants/metadata';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './protected-areas-sidebar-card-component';
import mapStateToProps from './protected-areas-sidebar-card-selectors';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const {
    activeLayers,
    changeGlobe,
    changeUI,
  } = props;
  const locale = useLocale();

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [protectionMetadataSource, setProtectionsMetadataSource] = useState(null);

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION];
    ContentfulService.getMetadata(md.slug, locale).then((data) => {
      if (data) {
        setProtectionsMetadataSource(data.source);
      }
    });
  }, [locale]);

  const handleLayerToggle = (option) => {
    if (option.layer === 'all') {
      // batchToggleLayers([selectedLayer, option.layer], activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY)
    } else {
      selectedLayers.find((layer) => layer === option.value)
        ? setSelectedLayers(selectedLayers.filter((layer) => layer !== option.value))
        : setSelectedLayers([...selectedLayers, option.value]);

      layerManagerToggle(option.value, activeLayers, changeGlobe, LAYERS_CATEGORIES.PROTECTION);
      const updateActiveLayers = activeLayers.filter((al) => al.title !== option.value);
      changeUI({ categoryActiveLayers: updateActiveLayers });
    }
  };

  return (
    <Component
      selectedLayers={selectedLayers}
      handleLayerToggle={handleLayerToggle}
      source={protectionMetadataSource}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
