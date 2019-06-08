import React from 'react';
import Component from './radio-group-component';
import { setModalMetadata } from 'components/modal-metadata/modal-metadata-actions';

const RadioGroupContainer = props => {

  const handleInfoClick = layer => {
    setModalMetadata({
      slug: layer.slug,
      title: `${layer.name} metadata`,
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

export default RadioGroupContainer;