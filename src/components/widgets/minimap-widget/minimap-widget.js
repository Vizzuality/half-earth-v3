import { loadModules } from '@esri/react-arcgis';
import React, { useState } from 'react';
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

  const handleMapLoad = (map, view, globeView ) => {
    map.ground.surfaceColor = '#0A212E';  // set surface color, before basemap is loaded
    disableInteractions(view); // disable all interactions on the minimap globe
    loadModules(["esri/layers/VectorTileLayer"]).then(([VectorTileLayer]) => { // load two-colors vector-tile-layer into minimap globe
      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      map.add(minimapLayer);
    });
    synchronizeWebScenes(globeView, view); // synchronize data-globe position, zoom etc. with minimap-globe
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    const { setPageTexts,openHalfEarthMeterAnalyticsEvent } = props;
    setPageTexts(VIEW);
    openHalfEarthMeterAnalyticsEvent();
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const { textData } = props;

  return (
    <>
      <MinimapWidgetComponent handleMapLoad={handleMapLoad} {...props} handleModalOpen={handleModalOpen}/>
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