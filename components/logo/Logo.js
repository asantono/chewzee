import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../variables";

const Logo = () => {
  return (
    <View>
      <Text>chewzee</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    // position: "relative",
    // fontSize: 30,
    // height: 40,
    // backgroundColor: "transparent",
    // color: colors.dark,
    // alignItems: "center",
  },
  text: {
    flex: 1,
    color: colors.black,
  },
});

export default Logo;
