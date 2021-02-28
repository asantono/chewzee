import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Instructions from "../components/instructions/Instructions";

const InstructionsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Instructions navigation={navigation} />
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
});

export default InstructionsPage;
