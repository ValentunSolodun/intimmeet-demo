import {put, call} from 'redux-saga/effects';
import {getUsers, getUser} from '../api';
import {GET_USERS_FAILED, GET_USERS_SUCCESS, GET_USER_SUCCESS, GET_USER_FAILED} from '../actions';

export function* getUsersSaga() {
  try {
    const data = yield call(getUsers);
    yield put({type: GET_USERS_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: GET_USERS_FAILED, payload: e});
  }
}

export function* getUserSaga({payload: {userId}}) {
  try {
    const data = yield call(getUser, userId);
    yield put({type: GET_USER_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: GET_USER_FAILED});
  }
}
