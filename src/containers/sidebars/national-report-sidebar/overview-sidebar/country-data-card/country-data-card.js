import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';
import { checkSpiInfoAnalytics } from 'actions/google-analytics-actions';

import Component from './country-data-card-component';

const actions = { checkSpiInfoAnalytics, ...metadataActions }

const CountryDataCardContainer = props => {

  return (
    <Component
      {...props}
    />
  )
}

export default connect(null, actions)(CountryDataCardContainer);