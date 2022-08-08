import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import { useLocale } from '@transifex/react';
import Component from './local-priority-card-component';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

import metadataConfig, {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/metadata';
import ContentfulService from 'services/contentful';
import mapStateToProps from './local-priority-card-selectors';

function LocalPriorityCardContainer(props) {
  const [priorityMetadata, setPriorityMetadata] = useState(null);
  const [protectionMetadata, setProtectionsMetadata] = useState(null);
  const [futurePlacesMetadata, setFuturePlacesMetadata] = useState(null);
  const locale = useLocale();

  const handleLayerToggle = (option) => {
    const { changeGlobe, activeLayers } = props;
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  };

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION]
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      setProtectionsMetadata(data);
    })
  }, [locale]);

  useEffect(() => {
    const md = metadataConfig[COUNTRY_PRIORITY]
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      setPriorityMetadata(data);
    })
  }, [locale]);

  useEffect(() => {
    const md = metadataConfig[HALF_EARTH_FUTURE_TILE_LAYER]
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      setFuturePlacesMetadata(data);
    })
  }, [locale]);

  return (
    <Component
      priorityMetadata={priorityMetadata}
      protectionMetadata={protectionMetadata}
      futurePlacesMetadata={futurePlacesMetadata}
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  );
}

export default connect(mapStateToProps, { ...metadataActions, ...urlActions })(LocalPriorityCardContainer);
