import React from 'react';
import { connect } from 'react-redux';
import Component from './checkbox-component';
import actions from 'redux_modules/metadata';

const CheckboxContainer = props => {

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${option.slug}`,
      title: `${option.name} metadata`,
      isOpen: true
    });
  };
 return (
  <Component
    handleInfoClick={handleInfoClick}
    {...props}
  />
 )
}

export default connect(null, actions)(CheckboxContainer);