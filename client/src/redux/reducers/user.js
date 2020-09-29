import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ERROR,
  SET_LOADING
} from "../types";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true, error: null, user: action.payload.user };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};
