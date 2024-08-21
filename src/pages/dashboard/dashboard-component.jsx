import React from 'react';

import Logo from 'components/half-earth-logo';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  return (
    <>
      <Logo />
      <DashboardView {...props} />
    </>
  );
}

export default DashboardComponent;
