import React, { useEffect } from "react";
import * as firebase from "firebase";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../redux/actions/userActions";

const UserListener = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const ref = firebase.database().ref("users/" + user.uid);
    if (!user.uid) return;
    const listener = ref.on("value", (snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val();
        dispatch(userUpdate(snap));
      }
    });

    return () => {
      ref.off("value", listener);
    };
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

export default UserListener;
