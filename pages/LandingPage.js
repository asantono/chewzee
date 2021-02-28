import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Landing from "../components/landing/Landing";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Landing navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
  },
});

export default LandingPage;
