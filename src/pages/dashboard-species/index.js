import React from 'react';
import { connect } from 'react-redux';

import DashboardSpeciesComponent from './dashboard-species-component';
import mapStateToProps from './dashboard-species-selectors';
import * as urlActions from 'actions/url-actions';
const actions = { ...urlActions };

function DashboardSpeciesContainer(props) {

  return <DashboardSpeciesComponent {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardSpeciesContainer);
