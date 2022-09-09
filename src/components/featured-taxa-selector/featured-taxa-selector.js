import React from 'react';
import { connect } from 'react-redux';

import { changeTaxaAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import Component from './featured-taxa-selector-component';

const actions = { ...urlActions, changeTaxaAnalytics };

function FeaturedTaxaSelectorContainer(props) {
  const handleTaxaButtonClick = (slug) => {
    const { changeUI, changeTaxaAnalytics: changeAnalytics } = props;
    changeAnalytics(slug);
    changeUI({ selectedTaxa: slug });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      handleTaxaButtonClick={handleTaxaButtonClick}
      {...props}
    />
  );
}

export default connect(null, actions)(FeaturedTaxaSelectorContainer);
