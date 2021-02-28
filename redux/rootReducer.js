import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import gameReducer from "./reducers/gameReducer";
import loadingReducer from "./reducers/loadingReducer";

const rootReducer = combineReducers({
  userReducer,
  gameReducer,
  loadingReducer,
});

export default rootReducer;
