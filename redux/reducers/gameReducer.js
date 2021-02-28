import {
  SET_GAME_ID,
  GAME_UPDATE,
  WORKING_ARRAY,
  WINNERS_ARRAY,
  GO_FALSE,
  GO_TRUE,
  RESET_WINNER,
  NOTIFICATION,
  UPDATE_CURRENT_GAME,
  UPDATE_START,
} from "../types";

const INITIAL_STATE = {
  go: false,
  zip: "",
  gameId: "",
  gameOverId: "",
  restaurants: {
    arr1: [],
    arr2: [],
  },
  userOne: "",
  userTwo: "",
  workingArray: [{ name: "Finding Food" }, { name: "Finding Food" }],
  winnersArray: [],
  workingOffArrayNum: "",
  winner: { name: "" },
  lastWinner: {
    name: "",
  },
  title: "",
  body: "",
  start: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GAME_ID:
      return {
        ...state,
        gameId: payload.gameId,
        gameOverId: payload.gameOverId,
        zip: payload.zip,
        userOne: INITIAL_STATE.userOne,
        userTwo: INITIAL_STATE.userTwo,
      };
    case GAME_UPDATE:
      return {
        ...state,
        restaurants: payload.restaurants,
        userOne: payload.userOne,
        userTwo: payload.userTwo || "",
        winner: payload.winner || "",
      };
    case WORKING_ARRAY:
      return {
        ...state,
        workingArray: payload.arr,
        workingOffArrayNum: payload.num || state.workingOffArrayNum,
      };
    case WINNERS_ARRAY:
      return {
        ...state,
        winnersArray: payload,
      };
    case GO_FALSE:
      return {
        ...state,
        go: false,
      };
    case GO_TRUE:
      return {
        ...state,
        go: true,
      };
    case RESET_WINNER:
      return {
        ...state,
        winner: INITIAL_STATE.winner,
        lastWinner: payload,
      };
    case NOTIFICATION:
      return {
        ...state,
        title: payload.title,
        body: payload.body,
      };
    case UPDATE_CURRENT_GAME:
      return {
        ...state,
        gameId: payload.gameId,
        gameOverId: payload.gameOverId,
      };
    case UPDATE_START:
      return {
        ...state,
        start: payload || 0,
      };
    default:
      return state;
  }
};

export default gameReducer;
