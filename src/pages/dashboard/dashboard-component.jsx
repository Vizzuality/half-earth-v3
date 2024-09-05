import React from 'react';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  return (
    <>
      <DashboardView {...props} />
    </>
  );
}

export default DashboardComponent;
