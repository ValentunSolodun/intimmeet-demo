import {combineReducers} from 'redux';
import UsersReducer from './users.reducer';
import UserReducer from './user.reducer';

export default combineReducers({
  users: UsersReducer,
  user: UserReducer
});
