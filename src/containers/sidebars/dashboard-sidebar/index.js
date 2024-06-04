import React from 'react';
import { connect } from 'react-redux';

import Component from './component.jsx';
import mapStateToProps from './selectors';

function DashboardSidebarContainer() {
  return <Component />;
}

export default connect(mapStateToProps, null)(DashboardSidebarContainer);
