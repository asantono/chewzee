import React, { useEffect } from "react";
import * as firebase from "firebase";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, noUser } from "../../redux/actions/userActions";

const Listen = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((newUser) => {
      if (newUser) {
        dispatch(userUpdate(newUser));
      } else {
        dispatch(noUser());
      }
    });
  }, [user.uid]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 0,
    height: 0,
  },
});

export default Listen;
