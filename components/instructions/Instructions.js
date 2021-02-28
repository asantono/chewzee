import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../variables";

const Instructions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>There are 16 restaurants!</Text>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.text}>
            Step 1: Choose your favorites from pairs of two
          </Text>
          <Text style={styles.text}>
            Step 2: Your friend will choose their favorites
          </Text>
          <Text style={styles.text}>
            Step 3: Rep
            <Text style={{ fontWeight: "800", color: colors.red }}>eat</Text>
          </Text>
          <Text style={styles.text}>
            Step 4:{" "}
            <Text
              style={{
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }}
            >
              Rep
            </Text>
            <Text style={{ fontWeight: "800", color: colors.red }}>eat</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Friends")}
      >
        <Text style={styles.button}>Let's Play!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    marginBottom: 80,
  },
  touchable: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    paddingBottom: 15,
    color: colors.red,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 20,
  },

  button: {
    flex: 1,
    fontSize: 25,
    color: colors.white,
    marginTop: 5,
    height: "100%",
    alignSelf: "center",
  },
});

export default Instructions;
