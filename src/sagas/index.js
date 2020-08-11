import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import {GET_USERS_REQUEST, GET_USER_REQUEST, LOGIN_REQUEST} from '../actions';

import {getUsersSaga, getUserSaga} from './users.saga';
import {loginSaga} from './login.saga';

function* rootSaga() {
  yield all([
    takeLatest(GET_USERS_REQUEST, getUsersSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga),
    takeLatest(LOGIN_REQUEST, loginSaga)
  ]);
}

export default rootSaga
