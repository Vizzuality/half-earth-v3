import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import Component from './local-priority-card-component';

const LocalPriorityCardContainer = props => {
  const handleInfoClick = slug => {
    const { setModalMetadata } = props;
    const md = metadataConfig[slug];
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

export default connect(null, metadataActions)(LocalPriorityCardContainer);