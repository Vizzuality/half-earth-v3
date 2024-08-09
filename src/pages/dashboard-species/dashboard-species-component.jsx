import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardSpeciesView from '../../containers/views/dashboard-species-view/dashboard-species-view';

function DashboardSpeciesComponent(props) {
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
      <DashboardSpeciesView
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

export default DashboardSpeciesComponent;
