import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MinimapWidgetComponent from './minimap-widget-component';
import { disableInteractions, minimapLayerStyles, synchronizeWebScenes } from 'utils/minimap-utils';
import HalfEarthModal from 'components/half-earth-modal/half-earth-modal';
import metadataActions from 'redux_modules/page-texts';
import { openHalfEarthMeterAnalyticsEvent } from 'actions/google-analytics-actions';

const VIEW = 'half-earth-meter';
const actions = {...metadataActions, openHalfEarthMeterAnalyticsEvent };

const MinimapWidget = props => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [isFireflyLoaded, setFireflyLoaded] = useState(false);

  useEffect(() => {
    toggleBasemapLayers();
  }, [isModalOpen]);

  const handleMapLoad = (map, view, globeView ) => {
    map.ground.surfaceColor = '#0A212E';  // set surface color, before basemap is loaded
    disableInteractions(view); // disable all interactions on the minimap globe
    loadModules(["esri/layers/VectorTileLayer","esri/layers/FeatureLayer", "esri/layers/TileLayer"]).then(([VectorTileLayer, FeatureLayer, TileLayer]) => { // load two-colors vector-tile-layer into minimap globe
      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      // const conservationLayer = new VectorTileLayer({
      //   url: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile2/VectorTileServer'
      // });
      // const flayer = new FeatureLayer({
      //   // URL to the service
      //   url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view/FeatureServer"
      // });
      map.add(minimapLayer);
    });
    setMap(map);
    synchronizeWebScenes(globeView, view); // synchronize data-globe position, zoom etc. with minimap-globe
  };

  const handleModalOpen = () => {
    if (!isFireflyLoaded) fetchFireflyLayer();
    setModalOpen(true);
    
    const { setPageTexts,openHalfEarthMeterAnalyticsEvent } = props;
    setPageTexts(VIEW);
    openHalfEarthMeterAnalyticsEvent();
  };

  const toggleBasemapLayers = () => {
    const fireflyLayer = map && map.layers.items.find(({ title }) => title === 'HalfEarthFirefly');
    fireflyLayer && map.reorder(fireflyLayer, isModalOpen ? 1 : 0)
  }

  const fetchFireflyLayer = () => {
    loadModules(["esri/layers/TileLayer"]).then(([TileLayer]) => {
      console.log('FETCHING FIREFLY LAYER...');
      var firefly = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer"
      });
      map.add(firefly);
      setFireflyLoaded(true);
    });
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const { textData } = props;

  return (
    <>
      <MinimapWidgetComponent handleMapLoad={handleMapLoad} {...props} handleModalOpen={() =>{
        isModalOpen ? handleModalClose() : handleModalOpen();
      }}
      isModalOpen={isModalOpen}/>
      {isModalOpen && <HalfEarthModal handleModalClose={handleModalClose} textData={textData}/>}
    </>
  );
}

const mapStateToProps = ({ pageTexts }) => ({
  textData: pageTexts.data[VIEW],
  loading: pageTexts.loading,
  error: pageTexts.error
});


export default connect(mapStateToProps, actions)(MinimapWidget);