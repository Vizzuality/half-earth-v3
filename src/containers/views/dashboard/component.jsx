import React from 'react';

import MapView from '../../../components/map-view';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function DashboardViewComponent() {
  return (
    <MapView
      mapName="dashboard"
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    />
  );
}

export default DashboardViewComponent;
