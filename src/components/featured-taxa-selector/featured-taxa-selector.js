import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import Component from './featured-taxa-selector-component.jsx';


const FeaturedTaxaSelectorContainer = props => {
  const handleTaxaButtonClick = slug => {
    const { changeUI } = props;
    changeUI({ selectedTaxa: slug })
  };

  return (
    <Component
      handleTaxaButtonClick={handleTaxaButtonClick}
      {...props }
    />
  )
}

export default connect(null, actions)(FeaturedTaxaSelectorContainer);