import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_ERROR,
  SET_LOADING
} from "../types";
import axios from "axios";

const setAuthHeaders = JwtToken => {
  localStorage.setItem("JwtToken", JwtToken);
  axios.defaults.headers.common["jwt"] = JwtToken;
};
const remoteStorageToken = () => {
  localStorage.removeItem("JwtToken");
  delete axios.defaults.headers.common["jwt"];
};

const signup = (data, history) => dispatch => {
  //remoteStorageToken();
  dispatch({ type: SET_LOADING, payload: { loading: true } });
  axios
    .post("/signup", data)
    .then(res => {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { user: res.data.user }
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuthHeaders(res.data.jwt);
      dispatch({ type: SET_LOADING, payload: { loading: false } });
      history.push("/cours");
    })
    .catch(err => {
      //console.log(err.response.data.message[0].messages[0].message);
      dispatch({ type: SET_LOADING, payload: { loading: false } });
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: SET_ERROR, payload: { error: err.response.data } });
    });
};

const login = (data, history) => dispatch => {
  remoteStorageToken();
  dispatch({ type: SET_LOADING, payload: { loading: true } });
  axios
    .post("/login", data)
    .then(res => {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: { user: res.data.user }
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuthHeaders(res.data.jwt);
      dispatch({ type: SET_LOADING, payload: { loading: false } });
      history.push("/cours");
    })
    .catch(err => {
      dispatch({ type: SET_LOADING, payload: { loading: false } });
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: SET_ERROR, payload: { error: err.response.data } });
    });
};

const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
      dispatch({ type: SET_AUTHENTICATED, payload: { user: res.data } });
    })
    .catch(e => {
      console.error(e);
    });
};

const editUserDetails = userDetails => dispatch => {
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(e => {
      console.error(e);
    });
};

const logoutUser = () => dispatch => {
  remoteStorageToken();
  dispatch({ type: SET_UNAUTHENTICATED });
};

export { signup, login, getUserData, editUserDetails, logoutUser };
