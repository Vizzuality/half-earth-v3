import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { visitNrcOverviewAnalytics } from 'actions/google-analytics-actions';

import mapStateToProps from 'containers/sidebars/national-report-sidebar/national-report-sidebar-selectors';

import Component from './component.jsx';
const actions = { visitNrcOverviewAnalytics }

const OverviewSidebar = (props) => {

  useEffect(() => {
    const { visitNrcOverviewAnalytics } = props;
    visitNrcOverviewAnalytics()
  }, [])

  return (
    <Component
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(OverviewSidebar);
