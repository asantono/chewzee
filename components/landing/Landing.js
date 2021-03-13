import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { colors } from "../../variables";
import { deleteAllGames } from "../../api/game";

const Landing = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  let gamesPlayed = 0;
  let pageName = "InstructionsFull";
  if (user.pastGames) {
    gamesPlayed = user.pastGames.length;
    gamesPlayed > 2 ? (pageName = "Search") : (pageName = "InstructionsFull");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableBlue}
        onPress={() => navigation.navigate(pageName)}
      >
        <Text style={styles.button}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOrange}
        onPress={() => navigation.navigate("Friends")}
      >
        <Text style={styles.button}>Find Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate("ActiveGames")}
      >
        <Text style={styles.button}>Active Games</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => deleteAllGames()}
      >
        <Text style={styles.button}>Delete All Games</Text>
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
    height: "100%",
    marginBottom: 20,
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
  touchableBlue: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  touchableOrange: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
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

export default Landing;
