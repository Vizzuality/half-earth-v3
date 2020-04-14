import React from 'react';
import { connect } from 'react-redux';
import Component from './checkbox-component';
import metadataActions from 'redux_modules/metadata';
import { openLayerInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...metadataActions, openLayerInfoModalAnalyticsEvent };

const CheckboxContainer = props => {

  const handleInfoClick = (option) => {
    const { setModalMetadata, openLayerInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${option.slug}`,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true
    });
    openLayerInfoModalAnalyticsEvent({ slug: `${option.slug}` });
  };
 return (
  <Component
    handleInfoClick={handleInfoClick}
    {...props}
  />
 )
}

export default connect(null, actions)(CheckboxContainer);