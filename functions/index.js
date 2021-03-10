const admin = require("firebase-admin");
const functions = require("firebase-functions");
const fetch = require("node-fetch");
const express = require("express");
const nodemailer = require("nodemailer");
const { htmlToText } = require("html-to-text");
const { formatRes, shuffle } = require("./controllers/helperFunctions");
const serviceKey = require("./chewzee-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: "https://chewzee-2bf67-default-rtdb.firebaseio.com",
});

const app = express();

require("cors")({
  origin: true,
});

app.use(express.json());

const zomatoKey = functions.config().chewzee.zomatokey;
const sendGridKey = functions.config().sendgrid.key;

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
      round: 1,
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
  const { email, user } = req.body;
  try {
    const emailUser = await admin.auth().getUserByEmail(email);
    const snap = await admin
      .database()
      .ref(`users/${emailUser.uid}`)
      .once("value");
    if (!snap.exists()) {
      res.status(404).json({
        msg: "User not found in database. Please invite them to join chewzee",
      });
      return;
    }
    const otherUser = await snap.val();
    res.status(200).json({
      uid: otherUser.uid,
      email: otherUser.email,
      pushToken: otherUser.pushToken,
    });
  } catch {
    // setting error message on the tempFriend.msg property and watching
    // on addFriend to alert
    const bool = await emailSender(email, "join", user);
    !bool
      ? res.status(404).json({
          msg: "User not found in database. Please invite them to join chewzee",
        })
      : res.status(404).json({
          msg:
            "User not found in database. But, an email was sent to user inviting them to the app!",
        });
  }
});

class UserSchema {
  constructor(uid, email) {
    this.uid = uid || "";
    this.email = email || "";
    this.currentGame = {};
    this.pushToken = "";
  }
}

exports.createUserInDb = functions.auth.user().onCreate((user) => {
  try {
    const newUser = new UserSchema(user.uid, user.email);
    admin
      .database()
      .ref("users/" + user.uid)
      .set(newUser);

    user.sendEmailVerification();
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "user creation failed" });
  }
});

exports.addGameToPlayerTwo = functions.https.onRequest(async (req, res) => {
  try {
    const { user, friend } = req.body;

    const gameRef = admin
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
    res.status(201).json({ message: "Game added to player two" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to set game for player two" });
  }
});

exports.deleteActiveFromPlayerTwo = functions.https.onRequest(
  async (req, res) => {
    try {
      const { game, secondId } = req.body;
      const ref = admin.database().ref(`users/${secondId}/activeGames`);
      const response = await ref.once("value");
      const userTwoGames = await response.val();
      let deleteVal;
      for (let prop in userTwoGames) {
        if (userTwoGames[prop].gameId === game.gameId) {
          deleteVal = userTwoGames[prop].gameOverId;
        }
      }
      if (deleteVal) {
        admin
          .database()
          .ref(`users/${secondId}/activeGames/${deleteVal}`)
          .remove();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

exports.addFollowToFriend = functions.https.onRequest(async (req, res) => {
  try {
    const { user, tempFriend } = req.body;
    admin
      .database()
      .ref("users/" + tempFriend.uid + "/followers")
      .push({
        email: user.email,
        uid: user.uid,
        pushToken: user.pushToken || "",
      });
  } catch (err) {
    console.log(err);
  }
});

const emailSender = async (email, type, user, url) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "apikey",
        pass: sendGridKey,
      },
    });

    let subject, html;

    switch (type) {
      case "passwordRecovery":
        subject = "Password Reset";
        html = `<div>
        You have requested a password reset.
      </div><p>Please follow this link to reset your password: <a href=${url} /></p><div>
      -Anthony "Papa" Santo
     </div>`;
        break;
      case "join":
        subject = `${user.email} wants to play chewzee with you!`;
        html = `<div>chewzee is the best way to decide on what to eat.</div>
        <div>
        <p>You can find chewzee in the app store</p>
        </div>
        <div>Join the feast</div>
        <div>&nbsp;</div>
        <div>Sincerely,</div>
        <div>chewzee team</div>
        <div>Email: chewzeeapp@gmail.com</div>`;

      default:
        break;
    }

    await transporter.sendMail({
      from: '"chewzee team" <chewzeeapp@gmail.com>',
      to: email,
      subject,
      text: htmlToText(html, {
        wordwrap: false,
        tags: {
          a: {
            options: {
              noLinkBrackets: true,
              noAnchorUrl: true,
            },
          },
        },
      }),
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
