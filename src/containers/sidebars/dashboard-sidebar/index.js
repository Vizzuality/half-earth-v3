import React from 'react';
import { connect } from 'react-redux';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

import Component from './dashboard-sidebar-component.jsx';
import mapStateToProps from './selectors';

const actions = {
  ...aoisGeometriesActions,
};

function DashboardSidebarContainer(props) {
  return <Component {...props} />;
}

export default connect(mapStateToProps, actions)(DashboardSidebarContainer);
