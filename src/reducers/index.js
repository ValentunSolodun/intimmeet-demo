import {combineReducers} from 'redux';
import UserReducer from './users.reducer';

export default combineReducers({
  users: UserReducer,
});
