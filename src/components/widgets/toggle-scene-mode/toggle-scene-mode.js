import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import Component from './toggle-scene-mode-component';

const ToggleSceneWidget = props => {
  const { changeUI, sceneMode } = props;
  const handleSceneModeChange = () => changeUI({ sceneMode: sceneMode === 'global' ? 'local' : 'global' });

  return <Component handleSceneModeChange={handleSceneModeChange}/>;
}

export default connect(null, actions)(ToggleSceneWidget);
