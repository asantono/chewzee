import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export class UserSchema {
  constructor(uid, email) {
    this.uid = uid || "";
    this.email = email || "";
    this.currentGame = {};
    this.pushToken = "";
  }
}

export const signup = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // const currentUser = firebase.auth().currentUser;
    // const newUser = new UserSchema(currentUser.uid, currentUser.email);
    // firebase
    //   .database()
    //   .ref("users/" + currentUser.uid)
    //   .set(newUser);
  } catch (err) {
    console.log(err);
    Alert.alert(err.message);
  }
};

export const login = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const pushToken = async (token, user) => {
  if (!user) {
    return;
  }
  try {
    firebase
      .database()
      .ref("users/" + user.uid + "/pushToken")
      .set(token);
  } catch (err) {
    Alert.alert(err.message);
  }
};

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);
