import { loadModules } from '@esri/react-arcgis';
import { esriGeometryToGeojson } from 'utils/geojson-parser';
import { all, takeLatest, call, select, put, cancelled } from 'redux-saga/effects'
import { reduxConfig as speciesModule } from 'redux_modules/species';
import { reduxConfig as geoDescriberModule } from 'redux_modules/geo-description';
import axios from 'axios';

const SPECIES_FETCH_DATA_READY = speciesModule.actions.SPECIES_FETCH_DATA_READY
const SPECIES_FETCH_DATA_LOADING = speciesModule.actions.SPECIES_FETCH_DATA_LOADING
const SPECIES_FETCH_DATA_ERROR = speciesModule.actions.SPECIES_FETCH_DATA_ERROR

const molAPI = 'https://api.mol.org/1.x/species/info?scientificname='

// function* watchGridCellDataSet() {
//   yield takeLatest('SET_GRID_CELL_DATA', fetchSpeciesData)
// }

// function* fetchSpeciesData() {
//   const state = yield select();
//   const { gridCellData: { data: { SPECIES }} } = state;
//   const speciesArray = SPECIES.split(',');
//   const notDuplicatedSpeciesArray = [...new Set(speciesArray)];
//   const cancelSource = axios.CancelToken.source()
  
//   const promises = notDuplicatedSpeciesArray.map(
//     species => call(axios.get, `${molAPI}${species}`, { cancelToken: cancelSource.token })
//   );
//   try {
//     yield put(SPECIES_FETCH_DATA_LOADING());
//     const data = yield all(promises);
//     // Trigger species ready action
//     yield put(SPECIES_FETCH_DATA_READY(data))
//   } catch (error) {
//     yield put(SPECIES_FETCH_DATA_ERROR(error));
//   } finally {
//     if (yield cancelled()) {
//       // Cancel the fetch whenever the takeLatest send a new action
//       yield call(cancelSource.cancel)
//     }
//   }
// }


function* watchGridCellGeometrySet() {
  yield takeLatest('SET_GRID_CELL_GEOMETRY', fetchGeodescriberData)
}


function* fetchGeodescriberData() {
  const state = yield select();
  const { gridCellData: { geometry} } = state;
  console.log(geometry)
  yield loadModules(["esri/geometry/support/webMercatorUtils"])
    .then(([webMercatorUtils]) => {
          
        // create geoJson (needed for geodescriber request)
        const geoGeometry = webMercatorUtils.webMercatorToGeographic(geometry);
        console.log(geoGeometry)
        const geoJSON = esriGeometryToGeojson(geoGeometry);

          console.log(geoJSON)
    }).catch((err) => console.error(err));
}


export default function* rootSaga() {
  yield all([
    // watchGridCellDataSet(),
    watchGridCellGeometrySet()
  ])
}