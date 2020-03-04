import { loadModules } from 'esri-loader';
import { esriGeometryToGeojson } from 'utils/geojson-parser';
import { all, takeLatest, call, select, put, cancelled } from 'redux-saga/effects';
import geoDescriberActions from './geo-description-actions';
import axios from 'axios';

const { REACT_APP_GEO_DESCRIBER_API } = process.env;

const SET_GEO_DESCRIPTION_LOADING = geoDescriberActions.setGeoDescriptionLoading
const SET_GEO_DESCRIPTION_READY = geoDescriberActions.setGeoDescriptionReady
const SET_GEO_DESCRIPTION_ERROR = geoDescriberActions.setGeoDescriptionError


function* watchGridCellGeometrySet() {
  yield takeLatest('SET_GRID_CELL_GEOMETRY', fetchGeodescriberData)
}

function* fetchGeodescriberData() {
  let geoJSON;
  const state = yield select();
  const { gridCellData: { geometry} } = state;
  const cancelSource = axios.CancelToken.source()
  yield loadModules(["esri/geometry/support/webMercatorUtils"])
    .then(([webMercatorUtils]) => {
      // create geoJson (needed for geodescriber request)
      const geoGeometry = webMercatorUtils.webMercatorToGeographic(geometry);
      geoJSON = esriGeometryToGeojson(geoGeometry);
    }).catch((err) => console.error(err));

  try {
    yield put(SET_GEO_DESCRIPTION_LOADING());

    const response = yield fetch(`${REACT_APP_GEO_DESCRIBER_API}&template=True`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: geoJSON
    });
    const data = yield response.json();
    // Trigger species ready action
    yield put(SET_GEO_DESCRIPTION_READY(data));
  } catch (error) {
    yield put(SET_GEO_DESCRIPTION_ERROR(error));
  } finally {
    if (yield cancelled()) {
      // Cancel the fetch whenever the takeLatest send a new action
      yield call(cancelSource.cancel)
    }
  }
}


export default function* rootSaga() {
  yield all([
    watchGridCellGeometrySet()
  ])
}