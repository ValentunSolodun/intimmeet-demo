import {createSelector} from 'reselect'

export const getUsersSelector = createSelector(
  state => state.users.data,
  state => state.users.isLoading,
  state => state.users.errors,
  (data, isLoading, errors) => ({users: data, isLoading, errors})
)

export const getUserSelector = createSelector(
  state => state.user.data,
  state => state.user.isLoading,
  state => state.user.errors,
  (data, isLoading, errors) => ({user: data, isLoading, errors})
)
