import {GET_CALL_LOG_SUCCESS, GET_CALL_LOG_FAILED} from '../actions';

const initialState = {
  data: {},
  errors: null,
  isLoading: true,
};

const callLog = (state = initialState, action) => {
  switch (action.type) {
    case GET_CALL_LOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {...action.payload}
      }
    }
    case GET_CALL_LOG_FAILED: {
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
export default callLog;


