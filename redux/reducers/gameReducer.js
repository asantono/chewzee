import { newGameFalse } from "../actions/gameActions";
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
  NEW_GAME_FALSE,
  NEW_GAME_TRUE,
  ROUND_OVER,
  LOGOUT,
} from "../types";

const INITIAL_STATE = {
  goTo: false,
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
  winner: {},
  title: "",
  body: "",
  start: 0,
  round: 1,
  newGame: true,
  roundOver: false,
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
        newGame: INITIAL_STATE.newGame,
        winner: INITIAL_STATE.winner,
        workingArray: INITIAL_STATE.workingArray,
        round: INITIAL_STATE.round,
        winnersArray: INITIAL_STATE.winnersArray,
        lastWinner: INITIAL_STATE.lastWinner,
      };
    case WORKING_ARRAY:
      return {
        ...state,
        workingArray: payload.arr.length
          ? payload.arr
          : INITIAL_STATE.workingArray,
        workingOffArrayNum: payload.num || state.workingOffArrayNum,
      };
    case WINNERS_ARRAY:
      return {
        ...state,
        winnersArray: payload,
      };
    case ROUND_OVER:
      return {
        ...state,
        roundOver: payload,
      };
    case GO_FALSE:
      return {
        ...state,
        goTo: false,
      };
    case GO_TRUE:
      return {
        ...state,
        goTo: payload,
      };
    case RESET_WINNER:
      return {
        ...state,
        winner: INITIAL_STATE.winner,
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
        newGame: true,
      };
    case UPDATE_START:
      return {
        ...state,
        start: payload || 0,
      };
    case NEW_GAME_FALSE:
      return {
        ...state,
        newGame: false,
      };
    case NEW_GAME_TRUE:
      return {
        ...state,
        newGame: true,
        workingArray: INITIAL_STATE.workingArray,
        winnersArray: INITIAL_STATE.winnersArray,
      };
    case LOGOUT:
      return INITIAL_STATE;

    case GAME_UPDATE:
      // THIS IS ALL THE GAME LOGIC ACCEPT FOR ROUND ADVANCES AND WINNER ADVANCES
      // THOSE ARE DONE IN Game.js
      const { game, user } = payload;
      if (!game.restaurants) {
        Alert.alert("No restaurants found");
        return;
      }

      const { restaurants, userOne, userTwo, round } = game;

      const plainReturn = () => {
        return {
          ...state,
          restaurants: game.restaurants,
          round: game.round,
          roundOver: false,
          winner: game.winner || INITIAL_STATE.winner,
        };
      };

      const roundOverReturn = () => {
        return {
          ...state,
          workingArray: INITIAL_STATE.workingArray,
          workingOffArrayNum: state.workingOffArrayNum,
          restaurants: game.restaurants,
          userOne: game.userOne,
          userTwo: game.userTwo || "",
          winner: game.winner || INITIAL_STATE.winner,
          round: game.round,
          roundOver: false,
        };
      };

      const assignArrayOne = () => {
        return {
          ...state,
          workingArray: restaurants.arr1,
          workingOffArrayNum: 1,
          newGame: false,
          restaurants: game.restaurants,
          userOne: game.userOne,
          userTwo: game.userTwo || "",
          winner: game.winner || INITIAL_STATE.winner,
          round: game.round,
          roundOver: true,
        };
      };

      const assignArrayTwo = () => {
        return {
          ...state,
          workingArray: restaurants.arr2,
          workingOffArrayNum: 2,
          newGame: false,
          restaurants: game.restaurants,
          userOne: game.userOne,
          userTwo: game.userTwo || "",
          winner: game.winner || INITIAL_STATE.winner,
          round: game.round,
          roundOver: true,
        };
      };

      let data;
      switch (round) {
        case 1:
          // userOne gets arr1 / userTwo gets arr2
          // if the newGame prop is not true, return
          if (!state.newGame) {
            data = plainReturn();
            return data;
          }
          // Assign arr1 to userOne after checking that the round is not over
          if (userOne === user.uid) {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr1.length === 4) {
              data = roundOverReturn();
              return data;
            } else {
              // userOne gets arr1 here:
              data = assignArrayOne();
              return data;
            }
          } else {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr2.length === 4) {
              data = roundOverReturn();
              return data;
            }
            // Assign arr2 to userTwo after checking that the round is not over
            else {
              data = assignArrayTwo();
              return data;
            }
          }
        case 2:
          // userOne gets arr1 / userTwo gets arr1
          if (!state.newGame) {
            data = plainReturn();
            return data;
          }
          if (userTwo === user.uid) {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr1.length === 2) {
              data = roundOverReturn();
              return data;
            } else {
              data = assignArrayOne();
              return data;
            }
          } else {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr2.length === 2) {
              data = roundOverReturn();
              return data;
            } else {
              data = assignArrayTwo();
              return data;
            }
          }
        case 3:
          if (!state.newGame) {
            data = plainReturn();
            return data;
          }
          if (userOne === user.uid) {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr1.length === 1) {
              data = roundOverReturn();
              return data;
            } else {
              data = assignArrayOne();
              return data;
            }
          } else {
            // Check that picks were not already made and set to empty array if they were
            if (restaurants.arr2.length === 1) {
              data = roundOverReturn();
              return data;
            } else {
              data = assignArrayTwo();
              return data;
            }
          }
        case 4:
          // Give userTwo the final choice
          if (userTwo === user.uid && restaurants.arr1.length === 1) {
            return {
              ...state,
              workingArray: [...restaurants.arr1, ...restaurants.arr2],
              restaurants: game.restaurants,
              round: game.round,
              winner: game.winner,
            };
          } else {
            // Leave userOne in waiting until a winner is chosen
            return {
              ...state,
              restaurants: game.restaurants,
              round: game.round,
              winner: game.winner,
            };
          }
        default:
          break;
      }

    // switch (round) {
    //   case 1:
    //     // userOne gets arr1
    //     // userTwo gets arr2
    //     // if the newGame prop is not true, return
    //     if (!state.newGame) {
    //       return {
    //         ...state,
    //         restaurants: game.restaurants,
    //         round: game.round,
    //         winner: game.winner || INITIAL_STATE.winner,
    //       };
    //     }
    //     // Assign arr1 to userOne after checking that the round is not over
    //     if (userOne === user.uid) {
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr1.length === 4) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       } else {
    //         // userOne gets arr1 here:
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr1,
    //           workingOffArrayNum: 1,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     } else {
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr2.length === 4) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //       // Assign arr2 to userTwo after checking that the round is not over
    //        else {
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr2,
    //           workingOffArrayNum: 2,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     }
    //   case 2:
    //     // SAME PROCESS: DIFFERENT VARIABLES: REFACTOR THIS
    //     // userOne gets arr2
    //     // userTwo gets arr1
    //     if (!state.newGame) {
    //       return {
    //         ...state,
    //         restaurants: game.restaurants,
    //         round: game.round,
    //         winner: game.winner || INITIAL_STATE.winner,
    //       };
    //     }
    //     if (userTwo === user.uid) {
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr1.length === 2) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       } else {
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr1,
    //           workingOffArrayNum: 1,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     } else {
    //       console.log("PLACE 2");
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr2.length === 2) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       } else {
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr2,
    //           workingOffArrayNum: 2,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     }
    //   case 3:
    //     if (!state.newGame) {
    //       console.log("first if");
    //       return {
    //         ...state,
    //         restaurants: game.restaurants,
    //         round: game.round,
    //         winner: game.winner,
    //       };
    //     }
    //     if (userOne === user.uid) {
    //       console.log("PLACE 1");
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr1.length === 1) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       } else {
    //         console.log("IN ELSE");
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr1,
    //           workingOffArrayNum: 1,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     } else {
    //       console.log("PLACE 2");
    //       // Check that picks were not already made and set to empty array if they were
    //       if (restaurants.arr2.length === 1) {
    //         return {
    //           ...state,
    //           workingArray: INITIAL_STATE.workingArray,
    //           workingOffArrayNum: state.workingOffArrayNum,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       } else {
    //         return {
    //           ...state,
    //           workingArray: restaurants.arr2,
    //           workingOffArrayNum: 2,
    //           newGame: false,
    //           restaurants: game.restaurants,
    //           userOne: game.userOne,
    //           userTwo: game.userTwo || "",
    //           winner: game.winner || INITIAL_STATE.winner,
    //           round: game.round,
    //         };
    //       }
    //     }
    //   case 4:
    //     // Give userTwo the final choice
    //     if (userTwo === user.uid && restaurants.arr1.length === 1) {
    //       return {
    //         ...state,
    //         workingArray: [...restaurants.arr1, ...restaurants.arr2],
    //         restaurants: game.restaurants,
    //         round: game.round,
    //         winner: game.winner,
    //       };
    //     } else {
    //       return {
    //         ...state,
    //         restaurants: game.restaurants,
    //         round: game.round,
    //         winner: game.winner,
    //       };
    //     }
    //   default:
    //     break;
    // }

    default:
      return state;
  }
};

export default gameReducer;
