import {GET_USERS_SUCCESS, GET_USERS_FAILED} from '../actions';
import _ from 'lodash';

const initialState = {
  data: [],
  errors: null,
  isLoading: true,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: [...action.payload]
      }
    }
    case GET_USERS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      }
    }
    default:
      return state;
  }
}
export default users;
