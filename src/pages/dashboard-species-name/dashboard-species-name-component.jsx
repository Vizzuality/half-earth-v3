import React from 'react';

import DashboardSpeciesNameView from '../../containers/views/dashboard-species-name-view/dashboard-species-name-view';

function DashboardSpeciesNameComponent(props) {
  const {
    activeLayers,
    handleMapLoad,
  } = props;

  return (
    <>
      <DashboardSpeciesNameView
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />
    </>
  );
}

export default DashboardSpeciesNameComponent;
