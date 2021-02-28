import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../variables";

const Loading = () => {
  const { loading } = useSelector((state) => state.loadingReducer);
  const loader = (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );

  let returner = null;

  if (loading.length) returner = loader;
  else returner = <View style={{ height: 0, opacity: 0 }} />;
  return returner;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9000000,
  },
});

export default Loading;
