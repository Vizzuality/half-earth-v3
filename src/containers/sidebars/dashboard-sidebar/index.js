import React from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardSidebarContainer(props) {
  return <Component {...props} />;
}

export default connect(mapStateToProps, null)(DashboardSidebarContainer);
