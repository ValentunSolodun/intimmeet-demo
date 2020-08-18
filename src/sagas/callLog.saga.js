import {call, put} from 'redux-saga/effects';
import {getCallLog} from '../api';
import {GET_CALL_LOG_SUCCESS, GET_CALL_LOG_FAILED} from '../actions';

export function* getCallLogSaga() {
  try {
    const response = yield call(getCallLog);
    yield put({type: GET_CALL_LOG_SUCCESS, payload: response.data});
  } catch (e) {
    console.log(e);
    yield put({type: GET_CALL_LOG_FAILED, payload: e});
  }
}
