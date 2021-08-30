import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import Component from './component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import mapStateToProps from './selectors';
import * as urlActions from 'actions/url-actions';
import { AOIS_HISTORIC } from 'constants/layers-urls';
import { CRF_NAMES } from 'constants/geo-processing-services';
import EsriFeatureService from 'services/esri-feature-service';

import { 
  getTestingPolygon,
 } from 'services/geo-processing-services/species-range-service';

import { 
  getCrfData
 } from 'services/geo-processing-services/sample';
const actions = {...urlActions};

const Container = props => {


  const { changeGlobe, aoiId } = props;
  const [aoiGeometry, setAoiGeometry] = useState(null);
  const [aoiData, setAoiData] = useState(null);
  // Get country borders
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: AOIS_HISTORIC,
      whereClause: `hash_id = '${aoiId}'`,
      returnGeometry: true
    }).then((results) => {
      console.log(results)
      if (results && results.features.length) {
        const { geometry, attributes } = results.features[0];
        setAoiGeometry(geometry);
        setAoiData(attributes);
      } else {
        console.log('NO FEATURE WITH THAT AOI')
        // TODO
        // take the geometry from redux
        // get data from the crfs
        // store everything in the database
        getTestingPolygon().then(features => {
          setAoiGeometry(features[0].geometry);
          getCrfData({ 
            crfName: CRF_NAMES.MAMMALS,
            aoiFeatureGeometry: features[0].geometry,
            isMultidimensional: true
          }).then(({jobInfo, jobId, data}) => {
            setAoiData(data.value.features);
          })
        })
      }
    }).catch(error => {
      console.error('The AoI you are looking for is not stored on the data base, please redraw it again');
      console.log(error)
      // TODO
      // redirect to data globe
    })
  }, [aoiId])

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <Component
      aoiData={aoiData}
      aoiGeometry={aoiGeometry}
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(Container);