import React from 'react';
import { connect } from 'react-redux';

import Component from './component';
import mapStateToProps from './selectors';

function DashboardComponent(props) {
  return <Component {...props} />;
}

export default connect(mapStateToProps, null)(DashboardComponent);
