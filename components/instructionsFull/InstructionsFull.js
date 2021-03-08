import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../variables";

const InstructionsFull = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Here's how it works</Text>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.textStrike}>1: What do you want to eat?</Text>
          <Text style={styles.textStrike}>
            2: I don't know. What do you want to eat?
          </Text>
          <Text style={styles.text}>1: Search nearby restaurants</Text>
          <Text style={styles.text}>2: Pick your partner</Text>
          <Text style={styles.text}>
            3: Pick your preferred restaurant from each pair of restaurants
            shown
          </Text>
          <Text style={styles.text}>
            4: Your partner picks from your choices
          </Text>
          <Text style={styles.text}>
            5: You pick from your partners choices
          </Text>
          <Text style={styles.text}>6: Repeat, repeat, then eat</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.button}>Let's Start!</Text>
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
    padding: 15,
    marginBottom: 30,
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
  textStrike: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 20,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
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

export default InstructionsFull;
