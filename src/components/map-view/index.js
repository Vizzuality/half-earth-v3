import React, { useEffect, useState } from 'react';

import { loadModules } from 'esri-loader';

import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';

import Component from './component';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const mapViewConstraints = {
  minZoom: 3,
  rotationEnabled: false,
  snapToZoom: false,
  minScale: 147914381,
};

function ViewContainer(props) {
  const { mapId, mapName, onViewLoad } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const loaderOptions = {
    url: `https://js.arcgis.com/${API_VERSION}`,
  };

  useEffect(() => {
    loadModules(['esri/Map', 'esri/layers/FeatureLayer'], loaderOptions)
      .then(([Map, FeatureLayer]) => {
        const countries = new FeatureLayer({
          portalItem: {
            id: '53a1e68de7e4499cad77c80daba46a94',
          },
        });

        const flatMap = new Map({
          basemap: SATELLITE_BASEMAP_LAYER,
          ground: {
            surfaceColor: '#070710',
          },
          layers: [countries],
        });

        setMap(flatMap);
        // if (onMapLoad) {
        //   onMapLoad(flatMap);
        // }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (map) {
      loadModules(['esri/views/MapView'], loaderOptions)
        .then(([MapView]) => {
          const flatView = new MapView({
            map,
            container: `map-container-${mapName || mapId}`,
            zoom: 6,
            center: [-3, 42],
            popup: null,
            constraints: mapViewConstraints,
          });

          setView(flatView);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [map]);

  useEffect(() => {
    if (map && view) {
      if (onViewLoad) {
        onViewLoad(map, view);
      }
    }
  }, [map, view]);

  return <Component map={map} view={view} {...props} />;
}

export default ViewContainer;

// const [, setMap] = useState(null);
// // const [view, setView] = useState(null);

// const highlightCountry = async (query, zoomGeometry, layers, view) => {
//   const { countries, graphicsLayer, groupLayer } = layers;
//   // country symbol - when user clicks on a country
//   // we will query the country from the countries featurelayer
//   // add the country feature to the graphics layer.
//   const symbol = {
//     type: 'simple-fill',
//     color: 'rgba(255, 255, 255, 1)',
//     outline: null,
//   };

//   // query the countries layer for a country that intersects the clicked point
//   const {
//     features: [feature],
//   } = await countries.queryFeatures(query);
//   // user clicked on a country and the feature is returned
//   if (feature) {
//     graphicsLayer.graphics.removeAll();
//     feature.symbol = symbol;
//     // add the country to the graphics layer
//     graphicsLayer.graphics.add(feature);
//     // zoom to the highlighted country
//     view.goTo(
//       {
//         target: zoomGeometry,
//         extent: feature.geometry.clone(),
//       },
//       { duration: 1000 }
//     );
//     // set the group layer opacity to 1
//     // also increase the layer brightness and add drop-shadow to make the clicked country stand out.
//     groupLayer.effect = 'brightness(1.5) drop-shadow(0, 0px, 12px)';
//     groupLayer.opacity = 1;
//   }
// };

// useEffect(() => {
//   loadModules(
//     [
//       'esri/Map',
//       'esri/views/MapView',
//       'esri/layers/TileLayer',
//       // 'esri/Graphic',
//       'esri/layers/FeatureLayer',
//       'esri/layers/GraphicsLayer',
//       'esri/layers/GroupLayer',
//     ],
//     {
//       url: `https://js.arcgis.com/${API_VERSION}`,
//     }
//   )
//     .then(
//       ([
//         Map,
//         MapView,
//         TileLayer,
//         // Graphic,
//         FeatureLayer,
//         GraphicsLayer,
//         GroupLayer,
//       ]) => {
//         const worldImagery = new TileLayer({
//           portalItem: {
//             id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
//           },
//         });

//         worldImagery.when(() => {
//           worldImagery.sublayers.forEach((layer) => {
//             if (layer.popupEnabled === true) {
//               layer.popupEnabled = false;
//             }
//           });
//         });

//         const countries = new FeatureLayer({
//           portalItem: {
//             id: '53a1e68de7e4499cad77c80daba46a94',
//           },
//         });

//         // clicked country feature will be added to this layer
//         const graphicsLayer = new GraphicsLayer({
//           blendMode: 'destination-in',
//           title: 'layer',
//         });

//         const tileLayer = new TileLayer({
//           portalItem: {
//             // bottom layer in the group layer
//             id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
//           },
//         });
//         tileLayer.when(() => {
//           tileLayer.sublayers.forEach((layer) => {
//             if (layer.popupEnabled === true) {
//               layer.popupEnabled = false;
//             }
//           });
//         });

//         // this grouplayer has two layers
//         // destination-in blendMode set on the graphics layer
//         // country from the world imagery layer will show when user clicks on a country
//         const groupLayer = new GroupLayer({
//           layers: [
//             tileLayer,
//             // world imagery layer will show where it overlaps with the graphicslayer
//             graphicsLayer,
//           ],
//           opacity: 0, // initially this layer will be transparent
//         });

//         const layers = { countries, graphicsLayer, groupLayer };

//         const myMap = new Map({
//           // basemap: SATELLITE_BASEMAP_LAYER,
//           layers: [worldImagery, countries, groupLayer],
//         });

//         setMap(myMap);

//         const myView = new MapView({
//           map: myMap,
//           zoom: 6, // Zoom level
//           center: [-3, 42],
//           popup: null,
//           constraints: mapViewConstraints,
//           container: 'map',
//         });

//         myView.when(async () => {
//           const query = {
//             geometry: myView.center,
//             returnGeometry: true,
//             outFields: ['*'],
//           };
//           await highlightCountry(query, myView.center, layers, myView);
//         });

//         // listen to the view's click event
//         myView.on('click', async (event) => {
//           const query = {
//             geometry: myView.toMap(event),
//             returnGeometry: true,
//             outFields: ['*'],
//           };
//           await highlightCountry(query, query.geometry, layers, myView);
//         });
//       }
//     )
//     .catch((err) => {
//       console.error(err);
//     });
// }, []);
