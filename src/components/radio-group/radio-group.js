import React from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import Component from './radio-group-component';
import metadataActions from 'redux_modules/metadata';
import { openLayerInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...metadataActions, openLayerInfoModalAnalyticsEvent };

const RadioGroupContainer = props => {
  const { activeLayers, options } = props;
  const handleInfoClick = (layer, variant) => {
    const { setModalMetadata, openLayerInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${layer.layer}`,
      title: `${capitalize(layer.name)} ${variant} metadata`,
      isOpen: true
    });
    openLayerInfoModalAnalyticsEvent({ slug: `${layer.layer}` });
  };

  const activeLayersIds = activeLayers.map((l) => l.title);
  const radioOptions = options.map(option => (
    {
      ...option,
      selected: !!activeLayersIds.find((l) => l === option.layer)
    }
  ));
  return (
    <Component
      handleInfoClick={handleInfoClick}
      radioOptions={radioOptions}
      {...props}
    />
  );
}

export default connect(null, actions)(RadioGroupContainer);