import { all, takeLatest, call, select, put, cancelled } from 'redux-saga/effects'
import 'redux_modules/species/species.js';
import { SPECIES_FETCH_DATA_READY, SPECIES_FETCH_DATA_LOADING, SPECIES_FETCH_DATA_ERROR } from 'redux_modules/species/species-actions';
import axios from 'axios';

const molAPI = 'https://api.mol.org/1.x/species/info?scientificname='

function* watchGridCellDataFetch() {
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
    watchGridCellDataFetch()
  ])
}