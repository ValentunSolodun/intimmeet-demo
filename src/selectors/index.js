import {createSelector} from 'reselect';
import _ from 'lodash';

export const getUsersSelector = createSelector(
  state => state.users.data,
  state => state.users.isLoading,
  state => state.users.errors,
  (data, isLoading, errors) => ({users: data, isLoading, errors})
)

export const getCallLogSelector = createSelector(
  state => state.callLog.data,
  state => state.callLog.isLoading,
  state => state.callLog.errors,
  (data, isLoading, errors) => ({callLog: data, isLoading, errors})
)

export const getApprovalsSelector = createSelector(
  state => _.filter(state.approvals.data, d => d.approving_user_id === JSON.parse(localStorage.getItem('user')).id),
  state => _.filter(state.approvals.data, d => d.approved_user_id === JSON.parse(localStorage.getItem('user')).id),
  state => state.approvals.isLoading,
  state => state.approvals.errors,
  (myApproved, approvedMy, data, isLoading, errors) => ({approvals: {myApproved, approvedMy}, isLoading, errors})
)

export const getUserSelector = createSelector(
  state => state.user.data,
  state => state.user.isLoading,
  state => state.user.errors,
  (data, isLoading, errors) => ({user: data, isLoading, errors})
)
