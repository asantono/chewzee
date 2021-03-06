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
  if (user.email === tempFriend.email) {
    Alert.alert("This person is you. You can't play against yourself... yet");
    return;
  }
  try {
    firebase
      .database()
      .ref("users/" + user.uid + "/friends")
      .push(tempFriend);

    let body = { user, tempFriend };
    body = JSON.stringify(body);
    const firebaseFunc =
      "https://us-central1-chewzee-2bf67.cloudfunctions.net/addFollowToFriend";
    const headers = { "Content-type": "application/json" };
    await fetch(firebaseFunc, {
      method: "POST",
      headers,
      body: body,
    });
  } catch (err) {
    console.log(err);
    Alert.alert("Add failed. Try again later");
  }
};

export const addFriendToGame = async (friend, user) => {
  try {
    let body = { friend, user };
    const ref = firebase.database().ref(`games/${user.currentGame.gameId}`);
    let game = await ref.once("value");
    game = await game.val();
    if (game.userTwo) {
      Alert.alert(
        `You currently have an opponent. Please start a new game to play with ${friend.email}`
      );
      return 0;
    }
    ref.update({
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
    body = JSON.stringify(body);
    const firebaseFunc =
      "https://us-central1-chewzee-2bf67.cloudfunctions.net/addGameToPlayerTwo";
    const headers = { "Content-type": "application/json" };
    let findToken = await fetch(firebaseFunc, {
      method: "POST",
      headers,
      body: body,
    });
    findToken = await findToken.json();
    if (findToken.token) {
      sendPushNotification(findToken.token);
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

export const newCurrentGame = (user, game) => {
  try {
    firebase.database().ref(`users/${user.uid}/currentGame`).set(game);
  } catch (err) {
    Alert.alert("Update failed. Try again later");
  }
};

export const updateRound = async (user, round) => {
  try {
    await firebase
      .database()
      .ref(`games/${user.currentGame.gameId}`)
      .update({ round });
  } catch (err) {
    console.log(err);
  }
};

export const winnerWork = async (user, winningChoice) => {
  try {
    firebase
      .database()
      .ref(`games/${user.currentGame.gameId}/winner`)
      .set(winningChoice);
  } catch (err) {
    Alert.alert("Update failed. Try again later");
  }
};

export const gameOver = async (user) => {
  try {
    if (user.pastGames.length > 9) {
      const pastRef = firebase.database().ref(`users/${user.uid}/pastGames`);
      await pastRef.remove();
      const pastGames = user.pastGames.sort(
        (a, b) => b.gameInitiated - a.gameInitiated
      );
      for (let i = 0; i < 9; i++) {
        pastRef.push(pastGames[i]);
      }
    }
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

export const deleteActiveGame = async (user, game, dispatch) => {
  try {
    firebase
      .database()
      .ref(`users/${user.uid}/activeGames/${game.gameOverId}`)
      .remove();
    firebase.database().ref(`games/${game.gameId}`).remove();
    let secondId = game.userOne ? game.userOne : game.userTwo;
    if (secondId) {
      let body = { game, secondId };
      body = JSON.stringify(body);
      const firebaseFunc =
        "https://us-central1-chewzee-2bf67.cloudfunctions.net/deleteActiveFromPlayerTwo";
      const headers = { "Content-type": "application/json" };
      fetch(firebaseFunc, {
        method: "POST",
        headers,
        body: body,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllGames = async () => {
  firebase.database().ref(`games`).remove();
};
