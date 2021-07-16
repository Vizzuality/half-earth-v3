import React, {useEffect} from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import mapStateToProps from './data-globe-selectors';
import DataGlobeComponent from './data-globe-component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';

import { 
  SPECIES_RANGE_SERVICE_URL
 } from 'services/geo-processing-services/species-range-service';
const actions = {...urlActions};

const DataGlobeContainer = props => {

  useEffect(() => {
    loadModules(["esri/config"]).then(([esriConfig]) => {
      esriConfig.request.interceptors.push({
        // urls: 'https://nowcoast.noaa.gov/',
        urls: SPECIES_RANGE_SERVICE_URL,
        before: (params) => {
          // params.requestOptions.query.f = 'jsapi'
          console.log('INSIDE INTERCEPTOR', params)
        }
      })
    })
  },[])

  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(DataGlobeContainer);