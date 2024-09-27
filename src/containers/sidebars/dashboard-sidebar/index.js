import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-sidebar-component.jsx';
import mapStateToProps from './selectors';
import { NAVIGATION } from '../../../utils/dashboard-utils.js';

function DashboardSidebarContainer(props) {
  const {regionLayers, setRegionLayers, map, view, selectedIndex} = props;

  useEffect(() => {
    if(!map && !view) return;

    if(regionLayers.hasOwnProperty('SPI REGIONS') && selectedIndex !== NAVIGATION.TRENDS){
      const layer = regionLayers['SPI REGIONS'];
      const { ['SPI REGIONS']: name, ...rest } = regionLayers;
      setRegionLayers(rest);
      map.remove(layer);
    }
  }, [map, view]);


  return <Component {...props}/>;
}

export default connect(mapStateToProps, null)(DashboardSidebarContainer);
