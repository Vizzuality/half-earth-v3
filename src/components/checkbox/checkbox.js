import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import Component from './checkbox-component';

function CheckboxContainer(props) {
  const locale = useLocale();

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${option.slug}`,
      locale,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true,
    });
  };
  return <Component handleInfoClick={handleInfoClick} {...props} />;
}

export default connect(null, metadataActions)(CheckboxContainer);
