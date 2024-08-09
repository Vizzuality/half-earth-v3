import React from 'react';

import Component from './dashboard-species-view-component';

function DashboardSpeciesView(props) {
  const { activeLayers, viewSettings } = props;

  return (
    <Component
      updatedActiveLayers={activeLayers}
      viewSettings={viewSettings}
      {...props}
    />
  );
}

export default DashboardSpeciesView;
