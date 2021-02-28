// const firebase = require("firebase");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const { formatRes, shuffle } = require("./controllers/helperFunctions");

admin.initializeApp();

const app = express();

require("cors")({
  origin: true,
});

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   next();
// });

const zomatoKey = functions.config().chewzee.zomatokey;

exports.searchZomato = functions.https.onRequest(async (req, res) => {
  const headers = { "Content-type": "application/json", "user-key": zomatoKey };
  const { url, user, zip } = req.body;

  try {
    const data = await fetch(url, {
      method: "GET",
      headers,
    });
    const newData = await data.json();
    if (!newData.restaurants) {
      res
        .status(400)
        .json({ msg: "An error has occured. Please try again later" });
      return;
    }
    const formattedData = formatRes(newData.restaurants);
    const shuffledData = shuffle(formattedData);
    const newGameRef = admin.database().ref("games").push();
    const key = newGameRef.key;
    const gameInitiated = Date.now();
    newGameRef.set({
      restaurants: shuffledData,
      userOne: user.uid,
      userOneEmail: user.email,
      winner: { name: "" },
      gameInitiated,
    });
    const gameRef = admin
      .database()
      .ref("users/" + user.uid + "/activeGames")
      .push();
    const gameKey = gameRef.key;
    gameRef.set({ gameId: key, gameOverId: gameKey, zip: zip, gameInitiated });
    admin
      .database()
      .ref(`users/${user.uid}/currentGame`)
      .set({ gameId: key, gameOverId: gameKey, zip: zip, gameInitiated });
    res
      .status(200)
      .json({ gameId: key, gameOverId: gameKey, zip: zip, gameInitiated });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ msg: "An error has occured. Please try again later" });
  }
});

exports.getUserByEmail = functions.https.onRequest(async (req, res) => {
  const { email } = req.body;
  try {
    const emailUser = await admin.auth().getUserByEmail(email);
    if (!emailUser.email) {
      res.status(404).json({ msg: "user not found" });
      return;
    }
    const snap = await admin
      .database()
      .ref(`users/${emailUser.uid}`)
      .once("value");
    if (!snap.exists()) {
      res.status(404).json({ msg: "user not found in database" });
      return;
    }
    const user = await snap.val();
    res
      .status(200)
      .json({ uid: user.uid, email: user.email, pushToken: user.pushToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "user not found" });
  }
});
