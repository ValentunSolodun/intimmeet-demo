import {GET_USER_APPROVALS_FAILED, GET_USER_APPROVALS_SUCCESS} from '../actions';

const initialState = {
  data: {},
  errors: null,
  isLoading: true,
};

const approvals = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_APPROVALS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {...action.payload}
      }
    }
    case GET_USER_APPROVALS_FAILED: {
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
export default approvals;
