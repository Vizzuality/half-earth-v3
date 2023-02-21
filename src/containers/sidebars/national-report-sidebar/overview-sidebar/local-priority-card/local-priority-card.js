import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import { layerManagerToggle } from 'utils/layer-manager-utils';

import ContentfulService from 'services/contentful/contentful';

import metadataConfig, {
  COUNTRY_PRIORITY,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/metadata';

import Component from './local-priority-card-component';
import mapStateToProps from './local-priority-card-selectors';

function LocalPriorityCardContainer(props) {
  const [priorityMetadata, setPriorityMetadata] = useState(null);
  const [futurePlacesMetadata, setFuturePlacesMetadata] = useState(null);
  const locale = useLocale();

  const handleLayerToggle = (option) => {
    const { changeGlobe, activeLayers } = props;
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  };

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[COUNTRY_PRIORITY],
      locale
    ).then((data) => {
      setPriorityMetadata(data);
    });
  }, [locale]);

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[HALF_EARTH_FUTURE_TILE_LAYER],
      locale
    ).then((data) => {
      setFuturePlacesMetadata(data);
    });
  }, [locale]);

  return (
    <Component
      priorityMetadata={priorityMetadata}
      futurePlacesMetadata={futurePlacesMetadata}
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  );
}

export default connect(mapStateToProps, {
  ...metadataActions,
  ...urlActions,
})(LocalPriorityCardContainer);
