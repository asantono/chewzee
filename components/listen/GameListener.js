import React, { useEffect } from "react";
import * as firebase from "firebase";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { gameUpdate } from "../../redux/actions/gameActions";

const GameListener = ({ gameId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ref = firebase.database().ref("games/" + gameId);
    if (!gameId) return;
    const listener = ref.on("value", (snapshot) => {
      if (snapshot.exists()) dispatch(gameUpdate(snapshot.val()));
    });

    return () => ref.off("value", listener);
  }, [gameId]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 0,
    height: 0,
  },
});

export default GameListener;
