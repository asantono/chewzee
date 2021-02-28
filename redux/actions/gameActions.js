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
} from "../types";

import { setLoading } from "./loadingActions";

export const goTrue = () => {
  return { type: GO_TRUE };
};

export const goFalse = () => {
  return { type: GO_FALSE };
};

export const setRestaurants = (user, lat, lng, zip, start) => async (
  dispatch
) => {
  const loadId = uuid();
  dispatch(setLoading(loadId));
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
    dispatch(goTrue());
    dispatch(setLoading(loadId));
  } catch (err) {
    console.log(err);
    Alert.alert("Error communicating with server. Please try again later");
    dispatch(setLoading(loadId));
  }
};

export const gameUpdate = (game) => {
  if (!game.restaurants) {
    Alert.alert("No restaurants found");
    return;
  }
  return { type: GAME_UPDATE, payload: game };
};

export const setWorkingArray = (arr, num) => {
  if (!arr.length) {
    arr = [{ name: "Finding Food" }, { name: "Finding Food" }];
  }
  return { type: WORKING_ARRAY, payload: { arr, num } };
};

export const setWinnersArray = (arr) => {
  return { type: WINNERS_ARRAY, payload: arr };
};

export const resetWinner = (winner) => {
  return { type: RESET_WINNER, payload: winner };
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

export const updateCurrentGame = (game) => {
  return { type: UPDATE_CURRENT_GAME, payload: game };
};

export const updateStart = (num) => {
  return { type: UPDATE_START, payload: num };
};
