import React from 'react';
import { connect } from 'react-redux';
import Component from './checkbox-component';
import metadataActions from 'redux_modules/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...metadataActions, openInfoModalAnalyticsEvent };

const CheckboxContainer = props => {

  const handleInfoClick = (option) => {
    const { setModalMetadata, openInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: `${option.slug}`,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true
    });
    openInfoModalAnalyticsEvent({ slug: `${option.slug}` });
  };
 return (
  <Component
    handleInfoClick={handleInfoClick}
    {...props}
  />
 )
}

export default connect(null, actions)(CheckboxContainer);