import React from 'react';

import Logo from 'components/half-earth-logo';

import DashboardSpeciesView from '../../containers/views/dashboard-species-view/dashboard-species-view';

function DashboardSpeciesComponent(props) {
  return (
    <>
      <Logo />
      <DashboardSpeciesView {...props} />
    </>
  );
}

export default DashboardSpeciesComponent;
