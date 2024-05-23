import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { loadModules } from 'esri-loader';

import * as urlActions from 'actions/url-actions';

import Logo from 'components/half-earth-logo';

import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';

import uiStyles from 'styles/ui.module.scss';

import mapStateToProps from './selectors';

const actions = { ...urlActions };

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

function DashboardComponent(props) {
  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView'], {
      url: `https://js.arcgis.com/${API_VERSION}`,
    })
      .then(([Map, MapView]) => {
        const myMap = new Map({
          basemap: SATELLITE_BASEMAP_LAYER,
        });

        const myView = new MapView({
          map: myMap,
          center: [-118.805, 34.027], // Longitude, latitude
          zoom: 13, // Zoom level
          container: 'map',
        });
        setView(myView);
        setMap(myMap);
        console.log(map);
        console.log(view);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(props);
  return (
    <>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />
      <div
        id="map"
        style={{ width: '100vw', height: '100vh', paddingTop: '75px' }}
      />
    </>
  );
}

export default connect(mapStateToProps, actions)(DashboardComponent);
