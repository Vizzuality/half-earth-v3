import { all, takeLatest, call, select, put, cancelled } from 'redux-saga/effects'
import axios from 'axios';
import speciesActions from './geo-description-actions';

const SPECIES_FETCH_DATA_READY = speciesActions.SPECIES_FETCH_DATA_READY
const SPECIES_FETCH_DATA_LOADING = speciesActions.SPECIES_FETCH_DATA_LOADING
const SPECIES_FETCH_DATA_ERROR = speciesActions.SPECIES_FETCH_DATA_ERROR

const molAPI = 'https://api.mol.org/1.x/species/info?scientificname='

function* watchGridCellDataSet() {
  yield takeLatest('SET_GRID_CELL_DATA', fetchSpeciesData)
}

function* fetchSpeciesData() {
  const state = yield select();
  const { gridCellData: { data: { SPECIES }} } = state;
  const speciesArray = SPECIES.split(',');
  const notDuplicatedSpeciesArray = [...new Set(speciesArray)];
  const cancelSource = axios.CancelToken.source()
  
  const promises = notDuplicatedSpeciesArray.map(
    species => call(axios.get, `${molAPI}${species}`, { cancelToken: cancelSource.token })
  );
  try {
    yield put(SPECIES_FETCH_DATA_LOADING());
    const data = yield all(promises);
    // Trigger species ready action
    yield put(SPECIES_FETCH_DATA_READY(data))
  } catch (error) {
    yield put(SPECIES_FETCH_DATA_ERROR(error));
  } finally {
    if (yield cancelled()) {
      // Cancel the fetch whenever the takeLatest send a new action
      yield call(cancelSource.cancel)
    }
  }
}


export default function* rootSaga() {
  yield all([
    watchGridCellDataSet()
  ])
}