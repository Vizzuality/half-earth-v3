import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import Component from './local-priority-card-component';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

import metadataConfig, {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY
} from 'constants/metadata';
import metadataService from 'services/metadata-service';

const LocalPriorityCardContainer = props => {

  const [priorityMetadata, setPriorityMetadata] = useState(null);
  const [protectionMetadata, setProtectionsMetadata] = useState(null);

  const handleLayerToggle = (option) => {
    const { changeGlobe, activeLayers } = props;
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  }

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION]
    metadataService.getMetadata(md.slug).then( data => {
      setProtectionsMetadata(data);
    })
  }, []);

  useEffect(() => {
    const md = metadataConfig[COUNTRY_PRIORITY]
    metadataService.getMetadata(md.slug).then( data => {
      setPriorityMetadata(data);
    })
  }, []);

  return (
  <Component
    priorityMetadata={priorityMetadata}
    protectionMetadata={protectionMetadata}
    handleLayerToggle={handleLayerToggle}
    {...props}
  />
  )
}

export default connect(null, { ...metadataActions, ...urlActions })(LocalPriorityCardContainer);
