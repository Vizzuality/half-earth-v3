import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './local-scene-sidebar-selectors';
import Component from './local-scene-sidebar-component';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import countryDataActions from 'redux_modules/country-data';
import { downloadCountryPdfAnalyticsEvent, selectNRCSectionAnalyticsEvent } from 'actions/google-analytics-actions';
import metadataConfig from 'constants/metadata';
import { NATIONAL_REPORT_CARD_LANDING } from 'router'

const actions = { ...urlActions, ...countryDataActions, ...metadataActions, downloadCountryPdfAnalyticsEvent };

const LocalSceneSidebarContainer = (props) => {
  const {
    browsePage,
    countryName,
    downloadCountryPdfAnalyticsEvent
  } = props;

  const handleSceneModeChange = () => {
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
  }

  const handleTabSelection = slug => {
    const { changeUI } = props;
    changeUI({ localSceneActiveTab: slug });
    selectNRCSectionAnalyticsEvent(slug);
  };

  const handleSourceClick = slug => {
    const { setModalMetadata } = props;
    const md = metadataConfig[slug];
    setModalMetadata({
      slug: md.slug,
      isOpen: true
    });
  }

  const handlePrintReport = () => {
    const today = new Date();
    const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(today);
    const tempTitle = document.title;
    document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
    window.print();
    downloadCountryPdfAnalyticsEvent(countryName)
    document.title = tempTitle;
  }

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleSourceClick={handleSourceClick}
      handleTabSelection={handleTabSelection}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);