import React from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import Component from './checkbox-component';
import metadataActions from 'redux_modules/metadata';


const CheckboxContainer = props => {
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

  return (
    <Component
      handleInfoClick={handleInfoClick}
      {...props}
    />
  );
}

export default connect(null, metadataActions)(CheckboxContainer);
