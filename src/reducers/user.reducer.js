import {GET_USER_SUCCESS, GET_USER_FAILED} from '../actions';

const initialState = {
  data: {},
  errors: null,
  isLoading: true,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {...action.payload}
      }
    }
    case GET_USER_FAILED: {
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
export default user;


