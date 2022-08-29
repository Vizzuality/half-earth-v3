import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './national-report-sidebar-selectors';
import Component from './national-report-sidebar-component';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import countryDataActions from 'redux_modules/country-data';
import { downloadNrcPdfAnalytics } from 'actions/google-analytics-actions';

import { NATIONAL_REPORT_CARD_LANDING, NATIONAL_REPORT_CARD } from 'router';

const actions = {
  ...urlActions, ...countryDataActions, ...metadataActions, downloadNrcPdfAnalytics,
};

function NationalReportSidebarContainer(props) {
  const {
    browsePage,
    onboardingType,
  } = props;

  const handleClose = () => {
    const { changeUI } = props;
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
    if (onboardingType) changeUI({ onboardingType: 'national-report-cards', onboardingStep: 6, waitingInteraction: false });
  };

  const handleTabSelection = (slug) => {
    const {
      browsePage, countryISO, changeUI, onboardingType, onboardingStep,
    } = props;
    browsePage({ type: NATIONAL_REPORT_CARD, payload: { iso: countryISO, view: slug } });
    if (onboardingType) {
      changeUI({ onboardingStep: onboardingStep + 1, onboardingType, waitingInteraction: false });
    }
  };
  const handlePrintReport = () => {
    const { downloadNrcPdfAnalytics, countryName } = props;
    const today = new Date();
    const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(today);
    const tempTitle = document.title;
    document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
    window.print();
    downloadNrcPdfAnalytics(countryName);
    document.title = tempTitle;
  };

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleTabSelection={handleTabSelection}
      handleClose={handleClose}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(NationalReportSidebarContainer);
