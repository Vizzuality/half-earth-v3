import { loadModules } from 'esri-loader';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import MinimapWidgetComponent from './minimap-widget-component';
import { disableInteractions, minimapLayerStyles, synchronizeWebScenes } from 'utils/minimap-utils';
import HalfEarthModal from 'components/half-earth-modal/half-earth-modal';
import { openHalfEarthMeterAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { useMobile } from 'constants/responsive';

const VIEW = 'half-earth-meter';
const actions = { openHalfEarthMeterAnalyticsEvent, ...urlActions };

const MinimapWidget = (props) => {
  const { isHEModalOpen } = props;
  const setModal = (opened) => {
    const { changeUI } = props;
    changeUI({ isHEModalOpen: opened });
  }

  const isOnMobile = useMobile();

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
    setModal(true);
    const { openHalfEarthMeterAnalyticsEvent } = props;
    openHalfEarthMeterAnalyticsEvent();
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const { textData, hidden } = props;

  return (
    <div style={{ display: hidden ? 'none' : 'block' }}>
      {!isOnMobile && <MinimapWidgetComponent handleMapLoad={handleMapLoad} {...props} handleModalOpen={handleModalOpen}/>}
      {isHEModalOpen && <HalfEarthModal handleModalClose={handleModalClose} textData={textData}/>}
    </div>
  );
}

const mapStateToProps = ({ pageTexts }) => ({
  textData: pageTexts.data[VIEW],
  loading: pageTexts.loading,
  error: pageTexts.error
});


export default connect(mapStateToProps, actions)(MinimapWidget);