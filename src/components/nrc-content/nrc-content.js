import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';
import metadataActions from 'redux_modules/metadata';

import { NATIONAL_REPORT_CARD_LANDING } from 'router';

import { useLocale } from '@transifex/react';

import { downloadNrcPdfAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { getCountryNames } from 'constants/translation-constants';

import Component from './nrc-content-component';
import mapStateToProps from './nrc-content-selectors';

const actions = {
  ...urlActions,
  ...countryDataActions,
  ...metadataActions,
  downloadNrcPdfAnalytics,
};

function NrcContainer(props) {
  const { browsePage, onboardingType, countryName } = props;

  const locale = useLocale();
  const countryNames = useMemo(getCountryNames, [locale]);
  const localizedCountryName = countryNames[countryName] || countryName;
  const handleClose = () => {
    const { changeUI } = props;
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
    if (onboardingType)
      changeUI({
        onboardingType: 'national-report-cards',
        onboardingStep: 6,
        waitingInteraction: false,
      });
  };

  const handlePrintReport = () => {
    const today = new Date();
    const date = Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(today);
    // eslint-disable-next-line no-undef
    const tempTitle = document.title;
    // eslint-disable-next-line no-undef
    document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
    window.print();
    downloadNrcPdfAnalytics(countryName);
    // eslint-disable-next-line no-undef
    document.title = tempTitle;
  };

  return (
    <Component
      {...props}
      handleClose={handleClose}
      handlePrintReport={handlePrintReport}
      countryName={localizedCountryName}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcContainer);
