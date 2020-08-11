import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import {GET_USERS_REQUEST, GET_USER_REQUEST} from '../actions';

import {getUsersSaga, getUserSaga} from './users.saga';

function* rootSaga() {
  yield all([
    takeLatest(GET_USERS_REQUEST, getUsersSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga)
  ]);
}

export default rootSaga
