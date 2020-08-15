import {put, call} from 'redux-saga/effects';
import {getUsers, getUser, getUserIds} from '../api';
import _ from 'lodash';
import {
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USERS_IDS_SUCCESS
} from '../actions';
import {initialize} from '../fake';

export function* getUsersSaga() {
  try {
    const response = yield call(getUsers);
    let mapTargetIds = [...response.data.map(d => d.id)];
    const userIds = yield call(getUserIds, {
      userIds: [JSON.parse(localStorage.getItem('user')).id],
      targetIds: mapTargetIds
    })

    // const userTargetIds = yield call(getUserIds, {
    //   userIds: [1, 2, 3],
    //   targetIds: [1, 2, 3]
    // });

    mapTargetIds = _.map(mapTargetIds, (t, i) => ({targetId: t, guId: userIds.data.target_ids[i]}))

    initialize(userIds.data.user_ids[0] || null);
    yield put({type: GET_USERS_SUCCESS, payload: response});
    yield put({type: GET_USERS_IDS_SUCCESS, payload: mapTargetIds});
  } catch (e) {
    console.log(e);
    yield put({type: GET_USERS_FAILED, payload: e});
  }
}

export function* getUserSaga({payload: {userId}}) {
  try {
    const response = yield call(getUser, userId);
    const targetIds = yield call(getUserIds, {
      userIds: [],
      targetIds: [userId]
    });
    response.data.guId = targetIds.data.target_ids[0];
    yield put({type: GET_USER_SUCCESS, payload: response});
  } catch (e) {
    console.log(e);
    yield put({type: GET_USER_FAILED});
  }
}
