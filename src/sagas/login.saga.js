import {call, put} from 'redux-saga/effects';
import {login as loginRequest} from '../api';
import {LOGIN_SUCCESS, LOGIN_FAILED} from '../actions';
import {customHistory} from '../helpers/history';
import {initialize} from '../fake';

export function* loginSaga({payload: {login, password}}) {
  try {
    const {data} = yield call(loginRequest, login, password);
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    customHistory.push('/');
    yield call(initialize, data.user.guid);
    yield put({type: LOGIN_SUCCESS});
  } catch (e) {
    yield put({type: LOGIN_FAILED, payload: e});
  }
}
