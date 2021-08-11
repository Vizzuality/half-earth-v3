import React from 'react';
import { connect } from 'react-redux';
import Component from './radio-group-component';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...metadataActions, openInfoModalAnalyticsEvent };

const RadioGroupContainer = props => {
  const { activeLayers, options } = props;
  const handleInfoClick = (layer, variant) => {
    const { setModalMetadata, openInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${layer.layer}`,
      isOpen: true
    });
    openInfoModalAnalyticsEvent({ slug: `${layer.layer}` });
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