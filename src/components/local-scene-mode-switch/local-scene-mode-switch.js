import React from 'react';
import { connect } from 'react-redux';
import Component from './local-scene-mode-switch-component';
import { selectNRCSectionAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

const actions = {...urlActions, selectNRCSectionAnalyticsEvent };

const LocalSceneModeSwitch = (props) => {
  const handleTabSelection = slug => {
    const { changeUI, selectNRCSectionAnalyticsEvent } = props;
    changeUI({ localSceneActiveTab: slug });
    selectNRCSectionAnalyticsEvent(slug);
  };


  return <Component handleTabSelection={handleTabSelection} {...props}/>
}

export default connect(null, actions)(LocalSceneModeSwitch);