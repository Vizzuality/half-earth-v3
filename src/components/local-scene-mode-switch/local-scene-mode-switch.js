import React from 'react';
import { connect } from 'react-redux';
import Component from './local-scene-mode-switch-component';
import * as actions from 'actions/url-actions';

const LocalSceneModeSwitch = (props) => {
  const handleTabSelection = slug => {
    const { changeUI } = props;
    changeUI({ localSceneActiveTab: slug })
  };


  return <Component handleTabSelection={handleTabSelection} {...props}/>
}

export default connect(null, actions)(LocalSceneModeSwitch);