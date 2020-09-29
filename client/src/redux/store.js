import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/user";
import courseReducer from "./reducers/course";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  course: courseReducer
});
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
