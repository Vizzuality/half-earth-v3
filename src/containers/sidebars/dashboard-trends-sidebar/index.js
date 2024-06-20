import React from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-trends-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardTrendsSidebarContainer() {
  return <Component />;
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
