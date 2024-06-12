import React from 'react';

import Component from './dashboard-view-component';

function DashboardView(props) {
  const { activeLayers, viewSettings } = props;

  return (
    <Component
      updatedActiveLayers={activeLayers}
      viewSettings={viewSettings}
      {...props}
    />
  );
}

export default DashboardView;
