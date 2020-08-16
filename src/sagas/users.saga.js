import {call, put} from 'redux-saga/effects';
import {getUser, getUsers} from '../api';
import {GET_USER_FAILED, GET_USER_SUCCESS, GET_USERS_FAILED, GET_USERS_SUCCESS} from '../actions';

export function* getUsersSaga() {
  try {
    const response = yield call(getUsers);
    yield put({type: GET_USERS_SUCCESS, payload: response.data});
  } catch (e) {
    console.log(e);
    yield put({type: GET_USERS_FAILED, payload: e});
  }
}

export function* getUserSaga({payload: {userId}}) {
  try {
    const response = yield call(getUser, userId);
    yield put({type: GET_USER_SUCCESS, payload: response.data});
  } catch (e) {
    console.log(e);
    yield put({type: GET_USER_FAILED});
  }
}
