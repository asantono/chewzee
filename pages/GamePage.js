import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Game from "../components/game/Game";
import Push from "../utils/push/Push";
import { colors } from "../variables";

const GamePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Push />
      <Game navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  upperText: {
    fontSize: 15,
    color: colors.red,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: -10,
  },
});

export default GamePage;
