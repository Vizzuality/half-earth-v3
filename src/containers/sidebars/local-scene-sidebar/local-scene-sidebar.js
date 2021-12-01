import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './local-scene-sidebar-selectors';
import Component from './local-scene-sidebar-component';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import countryDataActions from 'redux_modules/country-data';
import { NATIONAL_REPORT_CARD_LANDING, NATIONAL_REPORT_CARD } from 'router'

const actions = { ...urlActions, ...countryDataActions, ...metadataActions };

const LocalSceneSidebarContainer = (props) => {
  const {
    browsePage,
    handlePrintReport,
  } = props;

  const handleSceneModeChange = () => {
    browsePage({ type: NATIONAL_REPORT_CARD_LANDING });
  }

  const handleTabSelection = slug => {
    const { browsePage, countryISO } = props;
    browsePage({type: NATIONAL_REPORT_CARD, payload: { iso: countryISO, view:  slug }});
  };

  return (
    <Component
      handlePrintReport={handlePrintReport}
      handleTabSelection={handleTabSelection}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(LocalSceneSidebarContainer);