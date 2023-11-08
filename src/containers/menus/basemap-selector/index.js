import React from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

import Component from './component';
import mapStateToProps from './selectors';

const actions = {
  ...uiActions,
};

function BasemapSelectorComponent(props) {
  const { setLandcoverBasemap } = props;

  return <Component {...props} setLandcoverBasemap={setLandcoverBasemap} />;
}

export default connect(mapStateToProps, actions)(BasemapSelectorComponent);
