import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Card = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>Nothing</Text>
      </TouchableOpacity>
      {/* <Text>{store.restaurants[1]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Card;
