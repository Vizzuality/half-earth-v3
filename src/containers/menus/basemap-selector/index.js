import React from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

import Component from './component';
import mapStateToProps from './selectors';

const actions = {
  ...uiActions,
};

function BasemapSelectorComponent(props) {
  const { setBasemap } = props;

  return <Component {...props} setBasemap={setBasemap} />;
}

export default connect(mapStateToProps, actions)(BasemapSelectorComponent);
