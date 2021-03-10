import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import * as firebase from "firebase";
import * as Linking from "expo-linking";
import { colors } from "../../variables";
import { phoneNumFormat } from "../../utils/phoneNumFormat/phoneNumFormat";
import PastGameRecapList from "./PastGameRecapList";

const PastGameRecap = () => {
  const { gameId } = useSelector((state) => state.gameReducer);
  const [gameWinner, setGameWinner] = useState({});
  const [gameRestaurants, setGameRestaurants] = useState([]);

  const getGame = async () => {
    const gameVal = await firebase
      .database()
      .ref("games/" + gameId)
      .once("value");
    if (gameVal.exists()) {
      let res = gameVal.val();
      setGameWinner(res.winner);
      setGameRestaurants(res.restaurants.fullArr);
    }
    setGameWinner("Game Not Found");
    setGameRestaurants([]);
  };

  useEffect(() => {
    getGame();
  }, [gameId]);

  const phoneLink = (num) => {
    let formatedNum = phoneNumFormat(num);
    {
      Linking.openURL(`tel:+1${formatedNum}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Game Winner:</Text>
        <Text style={styles.title}>{gameWinner.name}</Text>
        <Text style={styles.cuisines}>Cuisines: {gameWinner.cuisines}</Text>
        <Text style={styles.address}>Address: {gameWinner.address}</Text>
        <Text
          style={styles.phone}
          onPress={() => phoneLink(gameWinner.phone_numbers)}
        >
          Phone: {gameWinner.phone_numbers}
        </Text>
        <Text style={styles.open}>Open: {gameWinner.timings}</Text>
        <Text style={styles.openBottom}>
          Avg price for two: ${gameWinner.average_cost_for_two}
        </Text>
      </View>
      <PastGameRecapList title="All Choices" list={gameRestaurants} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  list: {
    flexGrow: 1,
    flexDirection: "column",
  },
  text: {
    fontSize: 25,
    fontWeight: "800",
  },
  title: {
    fontSize: 30,
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
  },
  address: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.black,
  },
  phone: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.blueDark,
  },
  open: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.black,
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

export default PastGameRecap;
