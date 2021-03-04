import { Alert } from "react-native";
import { v4 as uuid } from "uuid";
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
} from "../types";
import { setLoading } from "./loadingActions";

export const goTrue = (name) => {
  return { type: GO_TRUE, payload: name };
};

export const goFalse = () => {
  return { type: GO_FALSE };
};

export const setRoundOver = (bool) => {
  return { type: ROUND_OVER, payload: bool };
};

export const setRestaurants = (user, lat, lng, zip, start) => async (
  dispatch
) => {
  const loadId = uuid();
  dispatch(setLoading(loadId));
  dispatch(setWorkingArray([]));
  dispatch(setWinnersArray([]));
  if (!start) start = 0;
  let end = start + 20;
  try {
    let url = `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lng}&radius=100&sort=real_distance&order=asc&start=${start}&count=${end}`;
    let body = { url, user, zip };
    body = JSON.stringify(body);
    const firebaseFunc =
      //   "http://localhost:5001/chewzee-2bf67/us-central1/searchZomato";
      "https://us-central1-chewzee-2bf67.cloudfunctions.net/searchZomato";
    const headers = { "Content-type": "application/json" };
    let res = await fetch(firebaseFunc, {
      method: "POST",
      headers,
      body: body,
    });
    res = await res.json();
    dispatch({ type: SET_GAME_ID, payload: res });
    dispatch(goTrue("addFriend"));
    dispatch(setLoading(loadId));
  } catch (err) {
    console.log(err);
    Alert.alert("Error communicating with server. Please try again later");
    dispatch(setLoading(loadId));
  }
};

export const setWorkingArray = (arr, num) => {
  return { type: WORKING_ARRAY, payload: { arr, num } };
};

export const setWinnersArray = (arr) => {
  return { type: WINNERS_ARRAY, payload: arr };
};

export const resetWinner = () => {
  return { type: RESET_WINNER };
};

export const pushNotification = (notification) => {
  let body = "",
    title = "";
  if (notification.request) {
    body = notification.request.content.body;
    title = notification.request.content.title;
  }
  return { type: NOTIFICATION, payload: { body, title } };
};

export const updateCurrentGame = (game) => (dispatch) => {
  dispatch(setWorkingArray([]));
  dispatch(setWinnersArray([]));
  dispatch({ type: UPDATE_CURRENT_GAME, payload: game });
};

export const updateStart = (num) => {
  return { type: UPDATE_START, payload: num };
};

export const newGameFalse = () => {
  return { type: NEW_GAME_FALSE };
};
export const newGameTrue = () => {
  return { type: NEW_GAME_TRUE };
};

export const gameUpdate = (obj) => {
  return { type: GAME_UPDATE, payload: obj };
};

// export const addFriendToGame = (friend, user) => async (dispatch) => {
//   const loadId = uuid();
//   dispatch(setLoading(loadId));
//   try {
//     let body = { friend, user };
//     body = JSON.stringify(body);
//     const firebaseFunc =
//       //   "http://localhost:5001/chewzee-2bf67/us-central1/searchZomato";
//       "https://us-central1-chewzee-2bf67.cloudfunctions.net/addFriendToGame";
//     const headers = { "Content-type": "application/json" };
//     let res = await fetch(firebaseFunc, {
//       method: "POST",
//       headers,
//       body: body,
//     });
//     res = await res.json();
//     dispatch(goTrue("game"));
//     dispatch(setLoading(loadId));
//   } catch (err) {
//     console.log(err);
//     Alert.alert("Error communicating with server. Please try again later");
//     dispatch(setLoading(loadId));
//   }
// };

// export const deleteActiveGame = (user, game) => async (dispatch) => {
//   const loadId = uuid();
//   dispatch(setLoading(loadId));
//   try {
//     let body = { user, game };
//     body = JSON.stringify(body);
//     const firebaseFunc =
//       //   "http://localhost:5001/chewzee-2bf67/us-central1/searchZomato";
//       "https://us-central1-chewzee-2bf67.cloudfunctions.net/deleteActiveGame";
//     const headers = { "Content-type": "application/json" };
//     let res = await fetch(firebaseFunc, {
//       method: "POST",
//       headers,
//       body: body,
//     });
//     res = await res.json();
//     dispatch(setLoading(loadId));
//   } catch (err) {
//     console.log(err);
//     Alert.alert("Error communicating with server. Please try again later");
//     dispatch(setLoading(loadId));
//   }
// };
