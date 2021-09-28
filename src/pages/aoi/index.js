import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import Component from './component.jsx';
import mapStateToProps from './selectors';
import * as urlActions from 'actions/url-actions';
import { LAYERS_URLS } from 'constants/layers-urls';
import { BIRDS, AMPHIBIANS, MAMMALS, ECOLOGICAL_LAND_UNITS, POPULATION, PROTECTED_AREA_PERCENTAGE, PROTECTED_AREAS_INSIDE_AOI, HUMAN_PRESSURES, REPTILES } from 'constants/geo-processing-services';
import EsriFeatureService from 'services/esri-feature-service';
import { logGeometryArea } from 'utils/analyze-areas-utils';
import { AOIS_HISTORIC  } from 'constants/analyze-areas-constants';
import { DATA } from 'router'

import { getCrfData } from 'services/geo-processing-services/sample';
const actions = {...urlActions};

const Container = props => {
  const { changeGlobe, aoiId, aoiStoredGeometry, precalculatedLayerSlug, browsePage } = props;
  const [isAoiInDatabase, setIsAoiInDatabase] = useState(true);
  const [newStoredAoi, setNewStoredAoi] = useState(null);
  const [aoiData, setAoiData] = useState(null);
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (precalculatedLayerSlug) {
      console.log('PRECALCULATED DATA', precalculatedLayerSlug)
      // EsriFeatureService.getFeatures({
      //   url: LAYERS_URLS[precalculatedLayerSlug],
      //   whereClause: `hash_id = '${aoiId}'`,
      //   returnGeometry: true
      // }).then((features) => {
      //   setAoiData(features[0].attributes);
      //   setGeometry(features[0].geometry);
      //   // LOG AOI GEOMETRY AREA
        // logGeometryArea(features[0].geometry);
      // })
    }
  }, [precalculatedLayerSlug])

  // Get stored aoi data on mount
  useEffect(() => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[AOIS_HISTORIC],
      whereClause: `hash_id = '${aoiId}'`,
      returnGeometry: true
    }).then((features) => {
      if (features) {
        setAoiData(features[0].attributes);
        setGeometry(features[0].geometry);
        // LOG AOI GEOMETRY AREA
        logGeometryArea(features[0].geometry);
      } else {
        setIsAoiInDatabase(false);
      }
    }).catch((error) => {
      console.error(error);
      // browsePage({ type: DATA });
    })
  }, [aoiId]);

  // Add aoi to local storage historic
  // useEffect(() => {

  // }, [aoiId])

  // Store aoi on historic feature layer
  useEffect(() => {
    if (!isAoiInDatabase && aoiStoredGeometry)  {
      EsriFeatureService.getLayer({
        slug: AOIS_HISTORIC
      }).then((layer) => {
        loadModules(["esri/Graphic"]).then(([Graphic]) => { 
          const newAoi =  new Graphic({
            geometry: geometry,
            attributes: {
              hash_id: aoiId
            }
          });
          layer.applyEdits({
            addFeatures: [newAoi]
          });
          setNewStoredAoi(newAoi)
        })
      })
    }
  }, [isAoiInDatabase, aoiStoredGeometry])

  useEffect(() => {
    if (newStoredAoi) {
        getCrfData({ 
          dataset: ECOLOGICAL_LAND_UNITS,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${ECOLOGICAL_LAND_UNITS} data`, data.value.features)
        })
        getCrfData({ 
          dataset: BIRDS,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${BIRDS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: AMPHIBIANS,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${AMPHIBIANS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: MAMMALS,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${MAMMALS} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: POPULATION,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${POPULATION} data`, data.value.features)
        })
        getCrfData({ 
          dataset: PROTECTED_AREA_PERCENTAGE,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${PROTECTED_AREA_PERCENTAGE} data`, data.value.features)
        })
        getCrfData({ 
          dataset: HUMAN_PRESSURES,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${HUMAN_PRESSURES} data`, data.value.features)
        })
        getCrfData({ 
          dataset: REPTILES,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${REPTILES} species count`, data.value.features.length, data.value)
        })
        getCrfData({ 
          dataset: PROTECTED_AREAS_INSIDE_AOI,
          aoiFeatureGeometry: geometry
        }).then(({jobInfo, jobId, data}) => {
          console.log(`${PROTECTED_AREAS_INSIDE_AOI} species count`, data.value.features.length, data.value)
        })
    }

  },[newStoredAoi])

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