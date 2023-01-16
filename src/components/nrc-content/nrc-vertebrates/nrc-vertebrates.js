import React from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

import Component from './nrc-vertebrates-component';
import mapStateToProps from './nrc-vertebrates-selectors';

const actions = {
  ...uiActions,
};

function VertebratesComponent(props) {
  const { setNRCSidebarView } = props;

  return <Component {...props} setNRCSidebarView={setNRCSidebarView} />;
}

export default connect(mapStateToProps, actions)(VertebratesComponent);
