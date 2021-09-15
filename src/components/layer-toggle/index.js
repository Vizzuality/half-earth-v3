import React from 'react';
import {connect} from 'react-redux'
import Component from './component';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

import { bringLayerToFront, bringLayerToBack } from 'utils/layer-manager-utils';

const actions = { ...metadataActions, openInfoModalAnalyticsEvent };

const Container = (props) => {
  const { map } = props;


  const handleInfoClick = (option) => {
    const { setModalMetadata, openInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${option.slug || option.value}`,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true
    });
    openInfoModalAnalyticsEvent({ slug: `${option.slug}` });
  }

  const handleBringToBackClick = (e,layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  }
  const handleBringToFrontClick = (e,layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  }

  return (
    <Component
      handleInfoClick={handleInfoClick}
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);