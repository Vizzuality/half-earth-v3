import Component from './toggle-scene-component.jsx';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

const ToggleSceneWidget = props => {
  const { view, changeUI, clickFindMyPositionAnalyticsEvent, hidden, sceneMode } = props;

  const sceneModes = ['local', 'global'];

  const handleSceneModeChange = (center) => changeUI({ sceneMode: sceneModes.filter(mode => mode !== sceneMode)[0] || 'global' });

  return <Component handleSceneModeChange={handleSceneModeChange}/>;
}

export default connect(null, actions)(ToggleSceneWidget);
