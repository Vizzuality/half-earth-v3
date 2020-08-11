import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import { SPECIES_PROTECTION_INDEX } from 'constants/metadata';
import Component from './country-data-card-component';

const CountryDataCardContainer = props => {
  const handleInfoClick = () => {
    const { setModalMetadata } = props;
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

export default connect(null, metadataActions)(CountryDataCardContainer);