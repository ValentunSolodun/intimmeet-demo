import {combineReducers} from 'redux';
import UsersReducer from './users.reducer';
import UserReducer from './user.reducer';
import CallLogReducer from './callLog.reducer';
import ApprovalsReducer from './approvals.reducer';

export default combineReducers({
  users: UsersReducer,
  user: UserReducer,
  approvals: ApprovalsReducer,
  callLog: CallLogReducer
});
