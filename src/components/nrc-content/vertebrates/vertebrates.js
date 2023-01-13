import React from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

import Component from './vertebrates-component';
import mapStateToProps from './vertebrates-selectors';

const actions = {
  ...uiActions,
};

function VertebratesComponent(props) {
  const { setNRCSidebarView } = props;

  return <Component {...props} setNRCSidebarView={setNRCSidebarView} />;
}

export default connect(mapStateToProps, actions)(VertebratesComponent);
