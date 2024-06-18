import React from 'react';

import Component from './dashboard-trends-view-component';

function DashboardTrendsView(props) {
  const { activeLayers, viewSettings } = props;

  return (
    <Component
      updatedActiveLayers={activeLayers}
      viewSettings={viewSettings}
      {...props}
    />
  );
}

export default DashboardTrendsView;
