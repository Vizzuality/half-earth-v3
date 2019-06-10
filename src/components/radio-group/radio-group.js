import React from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import Component from './radio-group-component';
import actions from 'redux_modules/metadata';

const RadioGroupContainer = props => {

  const handleInfoClick = (layer,option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${layer.layers[option]}`,
      title: `${capitalize(layer.name)} ${option} metadata`,
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

export default connect(null, actions)(RadioGroupContainer);