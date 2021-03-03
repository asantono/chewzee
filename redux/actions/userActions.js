import { v4 as uuid } from "uuid";
import { setLoading } from "./loadingActions";
import { USER_UPDATE, NO_USER, FRIENDS_UPDATE, TEMP_FRIEND } from "../types";

const makeSocialArray = (obj) => {
  let arr = [];
  let temp = {};
  for (let prop in obj) {
    temp = {
      email: obj[prop].email,
      uid: obj[prop].uid,
      pushToken: obj[prop].pushToken,
    };
    arr.push(temp);
    temp = {};
  }
  return arr;
};

const makeGameArray = (obj) => {
  let arr = [];
  for (let prop in obj) {
    arr.push(obj[prop]);
  }
  return arr;
};

export const userUpdate = (user) => {
  if (user.activeGames) user.activeGames = makeGameArray(user.activeGames);
  if (user.pastGames) user.pastGames = makeGameArray(user.pastGames);
  if (user.friends) user.friends = makeSocialArray(user.friends);
  if (user.followers) user.followers = makeSocialArray(user.followers);
  if (!user.activeGames) user.activeGames = [];
  if (!user.pastGames) user.pastGames = [];
  if (!user.friends) user.friends = [];
  if (!user.followers) user.followers = [];
  return { type: USER_UPDATE, payload: user };
};

export const noUser = () => {
  return { type: NO_USER };
};

export const friendsUpdate = () => {
  return { type: FRIENDS_UPDATE, payload: friendsList };
};

export const findFriend = (email) => async (dispatch) => {
  try {
    const loadId = uuid();
    dispatch(setLoading(loadId));
    let body = { email };
    body = JSON.stringify(body);
    const firebaseFunc =
      //   "http://localhost:5001/chewzee-2bf67/us-central1/getUserByEmail";
      "https://us-central1-chewzee-2bf67.cloudfunctions.net/getUserByEmail";
    const headers = { "Content-type": "application/json" };
    let res = await fetch(firebaseFunc, {
      method: "POST",
      headers,
      body: body,
    });
    res = await res.json();
    dispatch({ type: TEMP_FRIEND, payload: res });
    dispatch(setLoading(loadId));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(loadId));
    Alert.alert("Failed to find restaurants. Please try again later");
  }
};

export const clearFriend = () => {
  return { type: TEMP_FRIEND, payload: {} };
};
