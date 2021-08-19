import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

import { 
  getTestingPolygon,
  getSpeciesRangeTiff,
  TESTING_SPECIES_NAME,
  SPECIES_RANGE_SERVICE_URL
 } from 'services/geo-processing-services/species-range-service';

import { 
  getCrfData
 } from 'services/geo-processing-services/zonal-statistics-as-table';

const SpeciesRangeLayer = ({
  map
}) => {

  // useEffect(() => {
  //   getTestingPolygon().then(features => {
  //     // AOI feature should be used instead of the testing polygon comming from the service
  //     // The species name also should come from user interaction on the species widget
  //     getSpeciesRangeTiff(TESTING_SPECIES_NAME, features).then(({jobInfo, jobId, data}) => {
  //       console.log('DATA', data);
  //       console.log("features", features);
  //       // const mapServiceUrl = `${SPECIES_RANGE_SERVICE_URL}/MapServer/jobs/${jobId}`
  //       // const mapServiceUrl = 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer'
  //       // https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-JobInfo.html#fetchResultMapImageLayer
  //       jobInfo.fetchResultMapImageLayer(jobId).then((layer) => {
  //         console.log(layer)
  //         map.add(layer)
  //       })
  //       // loadModules(["esri/layers/MapImageLayer"]).then(([MapImageLayer]) => {
  //       //   var gpResultLayer = new MapImageLayer({
  //       //     url: mapServiceUrl,
  //       //     id: "gpLayer",
  //       //     opacity: 0.5,
  //       //     // imageFormat: 'png24'
  //       // });
  //       // console.log(gpResultLayer)
  //       //   map.add(gpResultLayer)
  //       // })
  //     })
  //   })
  //   }, [])

    useEffect(() => {
      getTestingPolygon().then(features => {
        console.log(features[0].geometry)
        getCrfData({ 
          crfName: 'ELU',
          aoiFeatureGeometry: features[0].geometry,
          isMultidimensional: false
        }).then(({jobInfo, jobId, data}) => {
          console.log(data)
        })
      })
    }, [])
  return null
}

export default SpeciesRangeLayer;