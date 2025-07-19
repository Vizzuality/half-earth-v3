import React, { useEffect } from 'react';

import DashboardLogin from '../../components/dashboard-login';
import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  const { activeLayers, handleMapLoad, loggedIn, setLoggedIn, countryISO } =
    props;

  useEffect(() => {
    if (countryISO !== 'EE' && countryISO !== 'GUY') {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {!loggedIn && (countryISO === 'EE' || countryISO === 'GUY') && (
        <DashboardLogin setLoggedIn={setLoggedIn} {...props} />
      )}
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
