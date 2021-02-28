import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { gameOver } from "../../api/game";
import { resetWinner } from "../../redux/actions/gameActions";
import { colors } from "../../variables";
import { phoneNumFormat } from "../../utils/phoneNumFormat/phoneNumFormat";

const Winners = () => {
  const { gameId, winner, lastWinner, game } = useSelector(
    (state) => state.gameReducer
  );
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (winner.name) {
      gameOver(user);
      dispatch(resetWinner(winner, user, game));
    }
  }, [winner]);

  const phoneLink = (num) => {
    let formatedNum = phoneNumFormat(num);
    {
      Linking.openURL(`tel:+1${formatedNum}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{lastWinner.name}</Text>
        <Text style={styles.cuisines}>Cuisines: {lastWinner.cuisines}</Text>
        <Text style={styles.address}>Address: {lastWinner.address}</Text>
        <Text
          style={styles.phone}
          onPress={() => phoneLink(lastWinner.phone_numbers)}
        >
          Phone: {lastWinner.phone_numbers}
        </Text>
        <Text style={styles.open}>Open: {lastWinner.timings}</Text>
        <Text style={styles.openBottom}>
          Avg price for two: ${lastWinner.average_cost_for_two}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 50,
  },
  text: {
    fontSize: 20,
    color: colors.dark,
  },

  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    marginTop: 10,
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 40,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "800",
    textAlign: "center",
    color: colors.red,
  },
  cuisines: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.pink,
    marginTop: 20,
  },
  address: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.black,
    marginTop: 20,
  },
  phone: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    textAlign: "center",
    color: colors.blueDark,
  },
  open: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.black,
    marginTop: 20,
  },

  openBottom: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: colors.black,
  },
  touchable: {
    width: 300,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: colors.red,
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

export default Winners;
