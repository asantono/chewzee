import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk";

const middleware = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
