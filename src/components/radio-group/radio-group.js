import React from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import Component from './radio-group-component';
import metadataActions from 'redux_modules/metadata';
import { openLayerInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...metadataActions, openLayerInfoModalAnalyticsEvent };

const RadioGroupContainer = props => {

  const handleInfoClick = (layer,option) => {
    const { setModalMetadata, openLayerInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${layer.layers[option]}`,
      title: `${capitalize(layer.name)} ${option} metadata`,
      isOpen: true
    });
    openLayerInfoModalAnalyticsEvent({ slug: `${layer.layers[option]}` });
  };
 return (
  <Component
    handleInfoClick={handleInfoClick}
    {...props}
  />
 )
}

export default connect(null, actions)(RadioGroupContainer);