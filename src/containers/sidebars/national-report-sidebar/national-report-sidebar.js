import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './national-report-sidebar-selectors';
import Component from './national-report-sidebar-component';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import countryDataActions from 'redux_modules/country-data';
import { NATIONAL_REPORT_CARD_LANDING, NATIONAL_REPORT_CARD } from 'router'

const actions = { ...urlActions, ...countryDataActions, ...metadataActions };

const NationalReportSidebarContainer = (props) => {
  const {
    browsePage,
    handlePrintReport,
  } = props;

  const handleClose = () => {
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
  }

  const handleTabSelection = (slug, slugonboardingStep, waitingInteraction = false) => {
    const { browsePage, countryISO, changeUI } = props;
    changeUI({ onboardingStep: slugonboardingStep, waitingInteraction });
    !slugonboardingStep && browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: countryISO, view: slug } });
  };

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleTabSelection={handleTabSelection}
      handleClose={handleClose}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(NationalReportSidebarContainer);
