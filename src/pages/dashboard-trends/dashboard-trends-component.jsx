import React from 'react';

import DashboardTrendsView from '../../containers/views/dashboard-trends-view/dashboard-trends-view';

function DashboardTrendsComponent(props) {
  const {
    countryISO,
    countryName,
    activeLayers,
    handleMapLoad,
    viewSettings,
    isSidebarOpen,
    selectedSpecies,
    isBiodiversityActive,
  } = props;
  return (
    <>
      <DashboardTrendsView
        countryISO={countryISO}
        countryName={countryName}
        activeLayers={activeLayers}
        viewSettings={viewSettings}
        isSidebarOpen={isSidebarOpen}
        isBiodiversityActive={isBiodiversityActive}
        selectedSpecies={selectedSpecies}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />
    </>
  );
}

export default DashboardTrendsComponent;
