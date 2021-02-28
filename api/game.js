import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
import { sendPushNotification } from "../utils/push/Push";

export const addFollow = async (user, tempFriend) => {
  let userFriends = [];
  for (let i = 0; i < user.friends.length; i++) {
    userFriends.push(user.friends[i].uid);
  }
  if (userFriends.includes(tempFriend.uid)) {
    Alert.alert("You have already added this person");
    return;
  }
  try {
    firebase
      .database()
      .ref("users/" + user.uid + "/friends")
      .push(tempFriend);

    firebase
      .database()
      .ref("users/" + tempFriend.uid + "/followers")
      .push({
        email: user.email,
        uid: user.uid,
        pushToken: user.pushToken || "",
      });
  } catch (err) {
    Alert.alert("Add failed. Try again later");
  }
};

export const addFriendToGame = async (friend, user) => {
  try {
    firebase.database().ref(`games/${user.currentGame.gameId}`).update({
      userTwo: friend.uid,
      userTwoEmail: friend.email,
    });
    firebase.database().ref(`users/${user.uid}/currentGame`).update({
      userTwo: friend.uid,
      userTwoEmail: friend.email,
    });
    firebase
      .database()
      .ref(`users/${user.uid}/activeGames/${user.currentGame.gameOverId}`)
      .update({
        userTwo: friend.uid,
        userTwoEmail: friend.email,
      });

    const gameRef = firebase
      .database()
      .ref(`users/${friend.uid}/activeGames`)
      .push();
    const gameKey = gameRef.key;
    gameRef.set({
      gameId: user.currentGame.gameId,
      gameOverId: gameKey,
      zip: user.currentGame.zip,
      gameInitiated: user.currentGame.gameInitiated,
      userOne: user.uid,
      userOneEmail: user.email,
    });

    if (friend.pushToken) {
      await sendPushNotification(friend.pushToken);
    }
  } catch (err) {
    console.log(err);
    Alert.alert("Add failed. Try again later");
  }
};

export const updateGame = async (user, winnersArray, workingOffArrayNum) => {
  try {
    firebase
      .database()
      .ref(
        `games/${user.currentGame.gameId}/restaurants/arr${workingOffArrayNum}`
      )
      .set(winnersArray);
  } catch (err) {
    Alert.alert("Update failed. Try again later");
  }
};

export const winner = async (user, winningChoice) => {
  try {
    firebase
      .database()
      .ref(`games/${user.currentGame.gameId}/restaurants/winner`)
      .set(winningChoice);
  } catch (err) {
    Alert.alert("Update failed. Try again later");
  }
};

export const gameOver = async (user) => {
  try {
    firebase
      .database()
      .ref(`users/${user.uid}/pastGames`)
      .push(user.currentGame);
    firebase
      .database()
      .ref(`users/${user.uid}/activeGames/${user.currentGame.gameOverId}`)
      .remove();
  } catch (err) {
    console.log(err);
  }
};

// export const deleteAllGames = async () => {
//   firebase.database().ref(`games`).remove();
// };

export const deleteActiveGame = async (user, game) => {
  try {
    firebase
      .database()
      .ref(`users/${user.uid}/activeGames/${game.gameOverId}`)
      .remove();
    firebase.database().ref(`games/${game.gameId}`).remove();
    let secondId = game.userOne ? game.userOne : game.userTwo;
    if (secondId) {
      const ref = firebase.database().ref(`users/${secondId}/activeGames`);
      const res = await ref.once("value");
      const userTwoGames = await res.val();
      let deleteVal;
      for (let prop in userTwoGames) {
        if (userTwoGames[prop].gameId === game.gameId) {
          deleteVal = userTwoGames[prop].gameOverId;
        }
      }
      if (deleteVal) {
        firebase
          .database()
          .ref(`users/${secondId}/activeGames/${deleteVal}`)
          .remove();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const newCurrentGame = (user, game) => {
  try {
    // const {gameId, gameInitiated, gameOverId, userTwo, userTwoEmail, userOne, userOneEmail} = game
    firebase.database().ref(`users/${user.uid}/currentGame`).set(game);
  } catch (err) {
    Alert.alert("Update failed. Try again later");
  }
};
