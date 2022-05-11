import React, { useEffect } from 'react';
import Component from './component.jsx';
import { connect } from 'react-redux';
import mapStateToProps from 'containers/sidebars/national-report-sidebar/national-report-sidebar-selectors';
import { visitNrcOverviewAnalytics } from 'actions/google-analytics-actions';
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
