import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
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
      <DashboardView
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

export default DashboardComponent;
