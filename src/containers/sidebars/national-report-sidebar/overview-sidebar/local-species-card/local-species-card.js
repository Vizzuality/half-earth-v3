import React from 'react';
import { connect } from 'react-redux';

import { openSpeciesListAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { MODALS } from 'constants/ui-params';

import Component from './local-species-card-component';

const actions = { ...urlActions, openSpeciesListAnalytics };

function LocalSpeciesCardContainer(props) {
  const toggleModal = () => {
    const {
      openedModal,
      changeUI,
      openSpeciesListAnalytics: openSpeciesListAnalyticsAction,
    } = props;
    changeUI({ openedModal: !openedModal ? MODALS.SPECIES : null });
    if (!openedModal) {
      openSpeciesListAnalyticsAction();
    }
  };

  return <Component {...props} toggleModal={toggleModal} />;
}

export default connect(null, actions)(LocalSpeciesCardContainer);
