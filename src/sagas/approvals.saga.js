import {call, put} from 'redux-saga/effects';
import {getApprovals} from '../api';
import {GET_USER_APPROVALS_SUCCESS, GET_USER_APPROVALS_FAILED} from '../actions';

export function* getApprovalsSaga() {
  try {
    const response = yield call(getApprovals);
    yield put({type: GET_USER_APPROVALS_SUCCESS, payload: response.data});
  } catch (e) {
    console.log(e);
    yield put({type: GET_USER_APPROVALS_FAILED, payload: e});
  }
}
