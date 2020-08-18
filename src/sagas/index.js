import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import {
  GET_USERS_REQUEST,
  GET_USER_REQUEST,
  LOGIN_REQUEST,
  GET_USER_APPROVALS_REQUEST,
  GET_CALL_LOG_REQUEST
} from '../actions';

import {getUsersSaga, getUserSaga} from './users.saga';
import {getApprovalsSaga} from './approvals.saga';
import {getCallLogSaga} from './callLog.saga';
import {loginSaga} from './login.saga';

function* rootSaga() {
  yield all([
    takeLatest(GET_USER_APPROVALS_REQUEST, getApprovalsSaga),
    takeLatest(GET_CALL_LOG_REQUEST, getCallLogSaga),

    takeLatest(GET_USERS_REQUEST, getUsersSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga),
    takeLatest(LOGIN_REQUEST, loginSaga)
  ]);
}

export default rootSaga
