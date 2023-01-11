import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';
import metadataActions from 'redux_modules/metadata';
import uiActions from 'redux_modules/ui';

import {
  NATIONAL_REPORT_CARD,
  NATIONAL_REPORT_CARD_LANDING,
  AREA_OF_INTEREST,
} from 'router';

import { useLocale } from '@transifex/react';

import { downloadNrcPdfAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import { getCountryNames } from 'constants/translation-constants';
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';

import Component from './nrc-content-component';
import mapStateToProps from './nrc-content-selectors';

const actions = {
  ...urlActions,
  ...countryDataActions,
  ...metadataActions,
  ...uiActions,
  downloadNrcPdfAnalytics,
};

function NrcContainer(props) {
  const {
    browsePage,
    onboardingType,
    countryName,
    countryId,
    changeUI,
    setNRCSidebarView,
  } = props;

  const locale = useLocale();
  const countryNames = useMemo(getCountryNames, [locale]);
  const localizedCountryName = countryNames[countryName] || countryName;

  const handleClose = () => {
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
    if (onboardingType)
      changeUI({
        onboardingType: 'national-report-cards',
        onboardingStep: 6,
        waitingInteraction: false,
      });
  };

  const handleBubbleClick = ({ countryISO }) => {
    const { selectedFilterOption } = props;
    browsePage({
      type: NATIONAL_REPORT_CARD,
      payload: { iso: countryISO, view: LOCAL_SCENE_TABS_SLUGS.CHALLENGES },
      query: {
        ui: { countryChallengesSelectedFilter: selectedFilterOption.slug },
      },
    });
  };

  const goToAnalyzeAreas = () => {
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: countryId },
      query: {
        precalculatedLayerSlug: PRECALCULATED_LAYERS_SLUG.national,
      },
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

  const handleFilterSelection = (selectedFilter) => {
    changeUI({ countryChallengesSelectedFilter: selectedFilter.slug });
  };

  return (
    <Component
      {...props}
      handleClose={handleClose}
      handleBubbleClick={handleBubbleClick}
      handleFilterSelection={handleFilterSelection}
      handlePrintReport={handlePrintReport}
      goToAnalyzeAreas={goToAnalyzeAreas}
      countryName={localizedCountryName}
      setNRCSidebarView={setNRCSidebarView}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcContainer);
