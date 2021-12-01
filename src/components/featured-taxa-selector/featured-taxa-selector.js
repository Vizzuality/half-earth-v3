import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { changeTaxaAnalytics } from 'actions/google-analytics-actions';

import Component from './featured-taxa-selector-component.jsx';
const actions = { ...urlActions, changeTaxaAnalytics };


const FeaturedTaxaSelectorContainer = props => {
  const handleTaxaButtonClick = slug => {
    const { changeUI } = props;
    props.changeTaxaAnalytics(slug)
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