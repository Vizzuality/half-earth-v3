import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadModules } from 'esri-loader';

import * as urlActions from 'actions/url-actions';

import Logo from 'components/half-earth-logo';

// import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';

import uiStyles from 'styles/ui.module.scss';

import mapStateToProps from './selectors';

const actions = { ...urlActions };

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const mapViewConstraints = {
  minZoom: 3,
  rotationEnabled: false,
  snapToZoom: false,
  minScale: 147914381,
};

function DashboardComponent(props) {
  // const [map, setMap] = useState(null);
  // const [view, setView] = useState(null);

  const highlightCountry = async (query, zoomGeometry, layers, view) => {
    const { countries, graphicsLayer, worldImagery, groupLayer } = layers;
    console.log(layers);
    // country symbol - when user clicks on a country
    // we will query the country from the countries featurelayer
    // add the country feature to the graphics layer.
    const symbol = {
      type: 'simple-fill',
      color: 'rgba(255, 255, 255, 1)',
      outline: null,
    };

    // query the countries layer for a country that intersects the clicked point
    const {
      features: [feature],
    } = await countries.queryFeatures(query);
    // user clicked on a country and the feature is returned
    if (feature) {
      console.log('feature', feature);
      graphicsLayer.graphics.removeAll();
      feature.symbol = symbol;
      // add the country to the graphics layer
      graphicsLayer.graphics.add(feature);
      // zoom to the highlighted country
      view.goTo(
        {
          target: zoomGeometry,
          extent: feature.geometry.clone(),
        },
        { duration: 1000 }
      );
      // blur the world imagery basemap so that the clicked country can be highlighted
      worldImagery.effect = 'blur(8px) brightness(1.2) grayscale(0.8)';
      // set the group layer opacity to 1
      // also increase the layer brightness and add drop-shadow to make the clicked country stand out.
      groupLayer.effect = 'brightness(1.5) drop-shadow(0, 0px, 12px)';
      groupLayer.opacity = 1;
    }
  };

  useEffect(() => {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/TileLayer',
        // 'esri/Graphic',
        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer',
        'esri/layers/GroupLayer',
      ],
      {
        url: `https://js.arcgis.com/${API_VERSION}`,
      }
    )
      .then(
        ([
          Map,
          MapView,
          TileLayer,
          // Graphic,
          FeatureLayer,
          GraphicsLayer,
          GroupLayer,
        ]) => {
          const worldImagery = new TileLayer({
            portalItem: {
              id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
            },
          });

          worldImagery.when(() => {
            worldImagery.sublayers.forEach((layer) => {
              if (layer.popupEnabled === true) {
                layer.popupEnabled = false;
              }
            });
          });

          const countries = new FeatureLayer({
            portalItem: {
              id: '53a1e68de7e4499cad77c80daba46a94',
            },
          });

          // clicked country feature will be added to this layer
          const graphicsLayer = new GraphicsLayer({
            blendMode: 'destination-in',
            title: 'layer',
          });

          const tileLayer = new TileLayer({
            portalItem: {
              // bottom layer in the group layer
              id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
            },
          });
          tileLayer.when(() => {
            tileLayer.sublayers.forEach((layer) => {
              if (layer.popupEnabled === true) {
                layer.popupEnabled = false;
              }
            });
          });

          // this grouplayer has two layers
          // destination-in blendMode set on the graphics layer
          // country from the world imagery layer will show when user clicks on a country
          const groupLayer = new GroupLayer({
            layers: [
              tileLayer,
              // world imagery layer will show where it overlaps with the graphicslayer
              graphicsLayer,
            ],
            opacity: 0, // initially this layer will be transparent
          });

          const layers = { countries, worldImagery, graphicsLayer, groupLayer };

          const myMap = new Map({
            // basemap: SATELLITE_BASEMAP_LAYER,
            layers: [worldImagery, groupLayer],
          });

          const myView = new MapView({
            map: myMap,
            zoom: 6, // Zoom level
            center: [2, 46],
            popup: null,
            constraints: mapViewConstraints,
            container: 'map',
          });

          myView.when(async () => {
            const query = {
              geometry: myView.center,
              returnGeometry: true,
              outFields: ['*'],
            };
            await highlightCountry(query, myView.center, layers, myView);
          });

          // listen to the view's click event
          myView.on('click', async (event) => {
            const query = {
              geometry: myView.toMap(event),
              returnGeometry: true,
              outFields: ['*'],
            };
            await highlightCountry(query, query.geometry, layers, myView);
          });
        }
      )
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
        style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
      />
    </>
  );
}

export default connect(mapStateToProps, actions)(DashboardComponent);
