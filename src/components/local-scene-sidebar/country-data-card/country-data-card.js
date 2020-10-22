import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import { clickSpeciesProtectionIndexInfoAnalyticsEvent } from 'actions/google-analytics-actions';
import { SPECIES_PROTECTION_INDEX } from 'constants/metadata';
import Component from './country-data-card-component';

const actions = { clickSpeciesProtectionIndexInfoAnalyticsEvent, ...metadataActions }

const CountryDataCardContainer = props => {
  const handleInfoClick = () => {
    const {
      setModalMetadata,
      clickSpeciesProtectionIndexInfoAnalyticsEvent
    } = props;
    clickSpeciesProtectionIndexInfoAnalyticsEvent()
    const md = metadataConfig[SPECIES_PROTECTION_INDEX]
    setModalMetadata({
      slug: md.slug,
      title: md.title,
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