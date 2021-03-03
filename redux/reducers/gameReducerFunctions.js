const plainReturn = () => {
  return {
    ...state,
    restaurants: game.restaurants,
    round: game.round,
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
