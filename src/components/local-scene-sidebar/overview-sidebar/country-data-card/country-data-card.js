import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import { openInfoModalAnalyticsEvent } from 'actions/google-analytics-actions';
import { SPECIES_PROTECTION_INDEX } from 'constants/metadata';
import Component from './country-data-card-component';

const actions = { openInfoModalAnalyticsEvent, ...metadataActions }

const CountryDataCardContainer = props => {
  const handleInfoClick = () => {
    const {
      setModalMetadata,
      openInfoModalAnalyticsEvent
    } = props;
    openInfoModalAnalyticsEvent('Species Protection Index')
    const md = metadataConfig[SPECIES_PROTECTION_INDEX]
    setModalMetadata({
      slug: md.slug,
      isOpen: true
    });
  }

  return (
  <Component
    handleInfoClick={handleInfoClick}
    {...props}
  />
  )
}

export default connect(null, actions)(CountryDataCardContainer);