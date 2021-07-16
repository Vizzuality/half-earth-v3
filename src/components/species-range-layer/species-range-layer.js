import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

import { 
  getTestingPolygon,
  getSpeciesRangeTiff,
  TESTING_SPECIES_NAME,
  SPECIES_RANGE_SERVICE_URL
 } from 'services/geo-processing-services/species-range-service';

const SpeciesRangeLayer = ({
  map
}) => {

  useEffect(() => {
    getTestingPolygon().then(features => {
      // AOI feature should be used instead of the testing polygon comming from the service
      // The species name also should come from user interaction on the species widget
      getSpeciesRangeTiff(TESTING_SPECIES_NAME, features).then(({jobId, data}) => {
        console.log('DATA', data);
        console.log("JOBID", jobId);
        const mapServiceUrl = `${SPECIES_RANGE_SERVICE_URL}/MapServer/jobs/${jobId}`
        // const mapServiceUrl = 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer'
        loadModules(["esri/layers/MapImageLayer"]).then(([MapImageLayer]) => {
          var gpResultLayer = new MapImageLayer(mapServiceUrl, {
            id: "gpLayer",
            opacity: 0.5,
            // imageFormat: 'png24'
        });
        console.log(gpResultLayer)
          map.add(gpResultLayer)
        })
      })
    })
    }, [])
  return null
}

export default SpeciesRangeLayer;