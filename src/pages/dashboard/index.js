import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './dashboard-selectors';
import * as urlActions from 'actions/url-actions';

import DashboardComponent from './dashboard-component';
const actions = { ...urlActions };

function DashboardContainer(props) {

  return <DashboardComponent {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardContainer);
