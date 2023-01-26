import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';
import metadataActions from 'redux_modules/metadata';
import uiActions from 'redux_modules/ui';

import { NATIONAL_REPORT_CARD_LANDING, AREA_OF_INTEREST, routes } from 'router';

import { useLocale } from '@transifex/react';

import { downloadNrcPdfAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import ContentfulService from 'services/contentful';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import { getCountryNames } from 'constants/translation-constants';

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
  const [challengesInfo, setChallengesInfo] = useState('');

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[CHALLENGES_CHART],
      locale
    ).then((data) => {
      setChallengesInfo(data);
    });
  }, []);

  const handleClose = () => {
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
    if (onboardingType)
      changeUI({
        onboardingType: 'national-report-cards',
        onboardingStep: 6,
        waitingInteraction: false,
      });
  };

  const openAnalyzeArea = () => {
    const aoiPath = routes[AREA_OF_INTEREST].path.replace(':id?', countryId);
    const aoiUrl = new URL(`${window.location.origin}${aoiPath}`);
    aoiUrl.searchParams.append(
      'precalculatedLayerSlug',
      PRECALCULATED_LAYERS_SLUG.national
    );
    window.open(aoiUrl);
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
      challengesInfo={challengesInfo}
      countryName={localizedCountryName}
      openAnalyzeArea={openAnalyzeArea}
      handleClose={handleClose}
      handlePrintReport={handlePrintReport}
      setNRCSidebarView={setNRCSidebarView}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcContainer);
