import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

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
      <Logo className={cx(uiStyles.halfEarthLogoTopLeft)} />
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
