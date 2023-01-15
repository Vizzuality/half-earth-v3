import React from 'react';
import { connect } from 'react-redux';

import { AREA_OF_INTEREST } from 'router';

import * as urlActions from 'actions/url-actions';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';

import Component from './footer-component';

const actions = {
  ...urlActions,
};

function FooterComponent(props) {
  const { browsePage, countryId } = props;

  const goToAnalyzeAreas = () => {
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: countryId },
      query: {
        precalculatedLayerSlug: PRECALCULATED_LAYERS_SLUG.national,
      },
    });
  };

  return <Component {...props} goToAnalyzeAreas={goToAnalyzeAreas} />;
}

export default connect(null, actions)(FooterComponent);
