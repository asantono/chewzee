import {
  USER_UPDATE,
  NO_USER,
  LOGOUT,
  FRIENDS_UPDATE,
  TEMP_FRIEND,
  SET_GAME_ID,
} from "../types";

const INITIAL_STATE = {
  user: { uid: "" },
  tempFriend: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE:
      return {
        ...state,
        user: payload,
      };
    case NO_USER:
      return {
        ...state,
        user: INITIAL_STATE.user,
      };
    case FRIENDS_UPDATE:
      return {
        ...state,
        friends: payload,
      };
    case TEMP_FRIEND:
      return {
        ...state,
        tempFriend: payload,
      };
    case SET_GAME_ID:
      return {
        ...state,
        user: {
          ...state.user,
          currentGame: {
            ...state.user.currentGame,
            gameId: payload.gameId,
          },
        },
      };
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;
