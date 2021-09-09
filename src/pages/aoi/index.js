import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import mapStateToProps from './selectors';
import * as urlActions from 'actions/url-actions';
import { AOIS_HISTORIC } from 'constants/layers-urls';
import { BIRDS, AMPHIBIANS, MAMMALS, ECOLOGICAL_LAND_UNITS, POPULATION, PROTECTED_AREAS, HUMAN_PRESSURES, REPTILES } from 'constants/geo-processing-services';
import EsriFeatureService from 'services/esri-feature-service';
import { logGeometryArea } from 'utils/analyze-areas-utils';

import { getCrfData } from 'services/geo-processing-services/sample';
const actions = {...urlActions};

const Container = props => {
  const { changeGlobe, aoiId, aoiGeometry } = props;
  const [aoiData, setAoiData] = useState(null);
  // Get country borders
  useEffect(() => {
    // EsriFeatureService.getFeatures({
    //   url: AOIS_HISTORIC,
    //   whereClause: `hash_id = '${aoiId}'`,
    //   returnGeometry: true
    // }).then((results) => {
    //   console.log(results)
    //   if (results && results.features.length) {
    //     const { geometry, attributes } = results.features[0];
    //     // setAoiGeometry(geometry);
    //     setAoiData(attributes);
      // } else {
        logGeometryArea(aoiGeometry);
        // TODO
        // take the geometry from redux
        // get data from the crfs
        // store everything in the database
        getCrfData({ 
          dataset: ECOLOGICAL_LAND_UNITS,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${ECOLOGICAL_LAND_UNITS} data`, data.value.features)
        })
        getCrfData({ 
          dataset: BIRDS,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${BIRDS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: AMPHIBIANS,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${AMPHIBIANS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: MAMMALS,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${MAMMALS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: POPULATION,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${POPULATION} data`, data.value.features)
        })
        getCrfData({ 
          dataset: PROTECTED_AREAS,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${PROTECTED_AREAS} data`, data.value.features)
        })
        getCrfData({ 
          dataset: HUMAN_PRESSURES,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${HUMAN_PRESSURES} data`, data.value.features)
        })
        getCrfData({ 
          dataset: REPTILES,
          aoiFeatureGeometry: aoiGeometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${REPTILES} species count`, data.value.features.length, data.value)
        })
      // }
    // }).catch(error => {
    //   console.error('The AoI you are looking for is not stored on the data base, please redraw it again');
    //   console.log(error)
    //   // TODO
    //   // redirect to data globe
    // })
  }, [aoiId])

  const handleGlobeUpdating = (updating) => changeGlobe({ isGlobeUpdating: updating });
  

  return (
    <Component
      aoiData={aoiData}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}


export default connect(mapStateToProps, actions)(Container);