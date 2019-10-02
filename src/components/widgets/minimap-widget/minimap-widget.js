import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MinimapWidgetComponent from './minimap-widget-component';
import { disableInteractions, minimapLayerStyles, synchronizeWebScenes } from 'utils/minimap-utils';
import HalfEarthModal from 'components/half-earth-modal/half-earth-modal';
import metadataActions from 'redux_modules/page-texts';
import { openHalfEarthMeterAnalyticsEvent } from 'actions/google-analytics-actions';
import { spinGlobe } from 'utils/globe-events-utils';

const VIEW = 'half-earth-meter';
const actions = {...metadataActions, openHalfEarthMeterAnalyticsEvent };

const MinimapWidget = props => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [view,setView]= useState(null);
  const [isModalLayersLoaded, setModalLayersLoaded] = useState(false);
  const [handle, setHandle] = useState(null);
  const [removeSyncHandler, setSyncHandler] = useState(null);

  useEffect(() => {
    toggleBasemapLayers();
    toggleSpinnigGlobeAnimation();
  }, [isModalOpen]);

  const handleMapLoad = (map, view, globeView ) => {
    map.ground.surfaceColor = '#0A212E';  // set surface color, before basemap is loaded
    disableInteractions(view); // disable all interactions on the minimap globe
    loadModules(["esri/layers/VectorTileLayer","esri/layers/FeatureLayer", "esri/layers/TileLayer", "APL/HalfEarthHalo"])
      .then(([VectorTileLayer, FeatureLayer, TileLayer, HalfEarthHalo]) => { // load two-colors vector-tile-layer into minimap globe
      view.when(function(){                          

        // CUSTOM HALF EARTH HALO //
        const halfEarthHalo = new HalfEarthHalo({
          view: view,
          glowEnabled: false,
          // atmosphereEnabled: true,
          starsEnabled: false,
          background: {
            type: "color",
            color: [15, 43, 59, 1]
          },
          indicatorWidth: 16,
          indicatorGap: 1
        });
        
        halfEarthHalo.addIndicator({
          index: 0,
          progress: 14.9,
          color: "rgba(94,192,19,1.0)"  
        });
        
        halfEarthHalo.addIndicator({
          index: 1,
          progress: 7.47,
          color: "rgba(0,93,251,1.0)"
        }); 
        if(view) {
          view.environment.starsEnabled = false;
          view.environment.background = {
            type: "color",
            color: [15, 43, 59, 0]
          }
        }
      });

      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      map.add(minimapLayer);
    });
    setMap(map);
    setView(view);
    synchronizeWebScenes(globeView, view, setSyncHandler); // synchronize data-globe position, zoom etc. with minimap-globe
  };

  const handleModalOpen = () => {
    if (!isModalLayersLoaded) fetchModalLayers();
    setModalOpen(true);
    

    const { setPageTexts,openHalfEarthMeterAnalyticsEvent } = props;
    setPageTexts(VIEW);
    openHalfEarthMeterAnalyticsEvent();
  };

  const toggleBasemapLayers = () => {
    const minimapLayer = map && map.layers.items.find(({ title }) => title === 'MinimapLayer');
    minimapLayer && map.reorder(minimapLayer, isModalOpen ? 0 : 2)
  }

  const toggleSpinnigGlobeAnimation = () => {
    if( isModalOpen ) {
      !handle ? spinGlobe(view, setHandle) : handle.resume();
      if(view) {
        view.constraints.altitude = { max: 16500000, min: 16500000 };
        removeSyncHandler && removeSyncHandler.remove();
      }
    } else {
      handle && handle.pause();
      if(view) {
        view.constraints.altitude = { max: 12500000, min: 12500000 };
        synchronizeWebScenes(props.view, view, setSyncHandler); // synchronize data-globe position, zoom etc. with minimap-globe
      }

    }
  }

  const fetchModalLayers = () => {
    loadModules(["esri/layers/TileLayer", "esri/layers/VectorTileLayer","esri/layers/FeatureLayer"])
      .then(([TileLayer, VectorTileLayer, FeatureLayer]) => {
        console.log('FETCHING FIREFLY LAYER...');
        var firefly = new TileLayer({
          url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer"
        });
        map.add(firefly);
        // const conservationLayer = new FeatureLayer({
        //   url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view/FeatureServer/1"
        // });
        // map.add(conservationLayer);
        setModalLayersLoaded(true);
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