import { call, put, takeLatest, all } from 'redux-saga/effects';
import Api from '../api/api';
import * as actions from '../actions';

/**
 * saga acionada pela action FETCH_SHOTS.
 */
export function* fetchShots () {
  try {
    const shots = yield call(Api.getShots);
    console.log(shots);
    yield put({ type: actions.FETCH_SHOTS_SUCCEEDED, shots: shots });
  } catch (e) {
    yield put({ type: actions.FETCH_SHOTS_FAILED, error: e.message });
  }
}

/**
 * saga acionada pela action FETCH_SHOT,
 * @param {*} action 
 */
export function* fetchShot (action) {
  try {
    const shot = yield call(Api.getShot, action.payload.shotId);
    yield put({ type: actions.FETCH_SHOT_SUCCEEDED, shot: shot });
  } catch (e) {
    yield put({ type: actions.FETCH_SHOT_FAILED, error: e.message });
  }
}

/**
 * Segregate the action in a specific watcher makes it easier to test it.
 */
export function* watchFetchShots () {
  // takeLatest retorna apenas a última chamada. Caso seja feita nova
  // chamada antes do término da chamada anterior, a chamado em execução
  // será cancelada e a última chamada será executada.
  yield takeLatest(actions.FETCH_SHOTS, fetchShots)
}

/**
 * Segregate the action in a specific watcher makes it easier to test it.
 */
export function* watchFetchShot () {
  // takeLatest retorna apenas a última chamada. Caso seja feita nova
  // chamada antes do término da chamada anterior, a chamado em execução
  // será cancelada e a última chamada será executada.
  yield takeLatest(actions.FETCH_SHOT, fetchShot);
}

/**
 * The main saga, run by the middleware.
 */
export default function* rootSaga () {
  // using yield all is a non blocking way to wait for any of these actions
  // to be invoked.
  yield all([
    watchFetchShots(),
    watchFetchShot()
  ])
}