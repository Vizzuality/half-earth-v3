import React from 'react';

import DashboardLogin from '../../components/dashboard-login';
import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  const { activeLayers, handleMapLoad, loggedIn, setLoggedIn } = props;

  return (
    <>
      {!loggedIn && <DashboardLogin setLoggedIn={setLoggedIn} {...props} />}
      {loggedIn && (
        <DashboardView
          onMapLoad={(map) => handleMapLoad(map, activeLayers)}
          {...props}
        />
      )}
    </>
  );
}

export default DashboardComponent;
