import React from 'react';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';
import DashboardLogin from '../../components/dashboard-login';

function DashboardComponent(props) {
  const {
    activeLayers,
    handleMapLoad,
    loggedIn,
    setLoggedIn,
  } = props;

  return (
    <>
      {!loggedIn && <DashboardLogin setLoggedIn={setLoggedIn} />}
      {loggedIn && <DashboardView
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />}
    </>
  );
}

export default DashboardComponent;
