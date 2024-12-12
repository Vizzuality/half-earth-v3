import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
// import Popup from "@arcgis/core/widgets/Popup.js";

import Component from './component';
import mapStateToProps from './selectors';

function ViewContainer(props) {
  const {
    onMapLoad,
    mapName,
    mapId,
    viewSettings,
    map,
    setMap,
    view,
    setView,
    geometry,
  } = props;

  const [loadState, setLoadState] = useState('loading');
  const [countryLayer, setCountryLayer] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);
  const [groupLayer, setGroupLayer] = useState(null);

  const highlightCountry = async (query, zoomGeometry, flatView) => {
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
    } = await countryLayer.queryFeatures(query);
    // user clicked on a country and the feature is returned
    if (feature) {
      graphicsLayer.graphics.removeAll();
      feature.symbol = symbol;
      // add the country to the graphics layer
      graphicsLayer.graphics.add(feature);
      // zoom to the highlighted country
      flatView.goTo(
        {
          target: zoomGeometry,
          center: [zoomGeometry.longitude - 15, zoomGeometry.latitude],
          zoom: 5.5,
          extent: feature.geometry.clone(),
        },
        { duration: 1000 }
      );
      // set the group layer opacity to 1
      // also increase the layer brightness and add drop-shadow to make the clicked country stand out.
      groupLayer.effect = 'brightness(1.5) drop-shadow(0, 0px, 12px)';
      groupLayer.opacity = 1;
    }
  };

  useEffect(() => {
    const countries = new FeatureLayer({
      portalItem: {
        id: '53a1e68de7e4499cad77c80daba46a94',
      },
      id: 'INITIAL_COUNTRY_LAYER',
    });
    setCountryLayer(countries);

    const graphics = new GraphicsLayer({
      blendMode: 'destination-in',
      title: 'layer',
    });
    setGraphicsLayer(graphics);

    const tileLayer = new TileLayer({
      portalItem: {
        // bottom layer in the group layer
        id: '10df2279f9684e4a9f6a7f08febac2a9', // world imagery
      },
    });

    const group = new GroupLayer({
      id: 'INITIAL_GROUP_LAYER',
      layers: [
        tileLayer,
        // world imagery layer will show where it overlaps with the graphicslayer
        graphics,
      ],
      opacity: 0, // initially this layer will be transparent
    });
    setGroupLayer(group);

    const flatMap = new Map({
      basemap: SATELLITE_BASEMAP_LAYER,
      ground: {
        surfaceColor: '#070710',
      },
      layers: [countries, group],
    });

    setMap(flatMap);

    if (onMapLoad) {
      onMapLoad(flatMap);
    }
  }, []);

  useEffect(() => {
    if (map) {
      const flatView = new MapView({
        map,
        container: `map-container-${mapName || mapId}`,
        zoom: 6,
        // popup: new Popup(),
        ...viewSettings,
      });

      setView(flatView);
    }
  }, [map, viewSettings]);

  useEffect(() => {
    if (map && view) {
      setLoadState('loaded');
    }
  }, [map, view]);

  useEffect(() => {
    if (view && geometry) {
      const query = {
        geometry,
        returnGeometry: true,
        outFields: ['*'],
      };
      highlightCountry(query, query.geometry, view);
    }
  }, [view, geometry]);

  return <Component map={map} view={view} loadState={loadState} {...props} />;
}

export default connect(mapStateToProps, null)(ViewContainer);
