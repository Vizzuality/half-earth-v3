import React from 'react';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  const {
    activeLayers,
    handleMapLoad,
  } = props;

  return (
    <>
      <DashboardView
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />
    </>
  );
}

export default DashboardComponent;
