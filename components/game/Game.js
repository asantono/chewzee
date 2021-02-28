import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Animated, Platform } from "react-native";
import * as firebase from "firebase";
import {
  gameUpdate,
  setWinnersArray,
  setWorkingArray,
} from "../../redux/actions/gameActions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Linking from "expo-linking";
import { updateGame } from "../../api/game";
import { colors } from "../../variables";
import {
  phoneNumFormat,
  phoneNumDisplay,
} from "../../utils/phoneNumFormat/phoneNumFormat";
import FadeOutView from "../../annimationViews/FadeOutView";

const Game = ({ navigation }) => {
  const {
    restaurants,
    gameId,
    userOne,
    userTwo,
    workingArray,
    winnersArray,
    workingOffArrayNum,
    winner,
  } = useSelector((state) => state.gameReducer);
  const { user } = useSelector((state) => state.userReducer);

  if (!user) navigation.replace("Signup");

  const [startFade, setStartFade] = useState(false);
  const [startFadeTwo, setStartFadeTwo] = useState(false);
  const [startFloat, setStartFloat] = useState(false);
  const [startFloatTwo, setStartFloatTwo] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const ref = firebase.database().ref("games/" + gameId);
    if (!gameId) return;
    const listener = ref.on("value", (snapshot) => {
      if (snapshot.exists()) dispatch(gameUpdate(snapshot.val()));
    });
    return () => ref.off("value", listener);
  }, [gameId]);

  // Allow the restaurants arrays to shift each round
  useEffect(() => {
    if (
      (userOne === user.uid &&
        restaurants.arr1.length === 8 &&
        restaurants.arr1.length === restaurants.arr2.length) ||
      (userOne === user.uid &&
        restaurants.arr1.length === 2 &&
        restaurants.arr1.length === restaurants.arr2.length)
    ) {
      dispatch(setWorkingArray(restaurants.arr1, 1));
    } else {
      dispatch(setWorkingArray(restaurants.arr2, 2));
    }

    // Once a winner property exists in the db, go to winners page
    if (winner) {
      if (winner.name) {
        dispatch(setWorkingArray([]));
        navigation.navigate("Winner");
      }
    }

    // check that this is not the last round
    // if it is, give the last choice to player
    // 2 and clear player ones working array
    if (
      restaurants.arr1.length === 1 &&
      restaurants.arr2.length === 1 &&
      user.uid !== userOne
    ) {
      dispatch(setWorkingArray([...restaurants.arr1, ...restaurants.arr2]));
    } else if (
      restaurants.arr1.length === 1 &&
      restaurants.arr2.length === 1 &&
      user.uid === userOne
    ) {
      dispatch(
        setWorkingArray([
          {
            name: "Waiting For Player 2",
            cuisines:
              "You will be redirected to the winner when player two has chosen",
            hideButton: true,
          },
          { name: "Enjoy The Meal" },
        ])
      );
    }
  }, [restaurants]);

  const continueGame = async (choice) => {
    // start annimation
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    await sleep(1000);
    // check that there is a value
    if (!choice) return;
    // update the app state on each choice
    dispatch(setWinnersArray([...winnersArray, choice]));

    // check if game is over
    if (
      restaurants.arr1.length === 1 &&
      restaurants.arr2.length === 1 &&
      user.uid !== userOne
    ) {
      // create winner if game is over
      winner(user, choice);
      return;
    }
    // check if round is over
    if (workingArray[2]) {
      let copyArr = [...workingArray];
      let arraySplit = copyArr.slice(2);
      dispatch(setWorkingArray(arraySplit));
      // add choice to winners array
    } else {
      // if the round is over
      // reset working arr and update the db

      dispatch(
        setWorkingArray([
          {
            name: "Waiting For Player 2",
            cuisines: "You'll recieve their picks once they finish the round!",
            hideButton: true,
          },
          { name: "Enjoy The Meal" },
        ])
      );
      const updatedWinnersArray = [...winnersArray, choice];
      updateGame(user, updatedWinnersArray, workingOffArrayNum);
      dispatch(setWinnersArray([]));
    }
  };

  // TITLE INFO
  let email = "",
    zip = "";
  if (user.currentGame) {
    if (user.currentGame.zip) {
      zip = user.currentGame.zip;
    }
    if (user.currentGame.userOneEmail) {
      user.currentGame.userOneEmail === user.email
        ? (email = user.currentGame.userTwoEmail)
        : (email = user.currentGame.userOneEmail);
    } else email = user.currentGame.userTwoEmail;
  }
  //

  const phoneLink = (num) => {
    let formatedNum = phoneNumFormat(num);
    {
      Linking.openURL(`tel:+1${formatedNum}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.upperText}>
        Playing with: {email} in zip: {zip}
      </Text>
      {workingArray[0].hideButton ? (
        <View style={styles.waiting}>
          <Text style={styles.title}>{workingArray[0].name}</Text>
          <Text style={styles.cuisines} numberOfLines={1}>
            {workingArray[0].cuisines}
          </Text>
        </View>
      ) : (
        <FadeOutView
          style={styles.card}
          startFade={startFade}
          setStartFade={setStartFade}
          startFloat={startFloat}
          setStartFloat={setStartFloat}
        >
          <Text style={styles.title} numberOfLines={2}>
            {workingArray[0].name}
          </Text>
          <Text style={styles.cuisines} numberOfLines={2}>
            Cuisines: {workingArray[0].cuisines || "Not Listed"}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {workingArray[0].address}
          </Text>
          <Text
            style={styles.phone}
            numberOfLines={2}
            onPress={() => phoneLink(workingArray[0].phone_numbers)}
          >
            Phone: {phoneNumDisplay(workingArray[0].phone_numbers)}
          </Text>
          <Text style={styles.open} numberOfLines={4}>
            Open: {workingArray[0].timings}
          </Text>
          <Text style={styles.open} numberOfLines={1}>
            Avg price for two: ${workingArray[0].average_cost_for_two}
          </Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              continueGame(workingArray[0]);
              setStartFadeTwo(true);
              setStartFloat(true);
            }}
          >
            <Text style={styles.button}>choose me</Text>
          </TouchableOpacity>
        </FadeOutView>
      )}
      {workingArray[0].hideButton ? null : (
        <FadeOutView
          style={styles.card}
          startFade={startFadeTwo}
          setStartFade={setStartFadeTwo}
          startFloat={startFloatTwo}
          setStartFloat={setStartFloatTwo}
        >
          <Text style={styles.title} numberOfLines={2}>
            {workingArray[1].name}
          </Text>
          <Text style={styles.cuisines} numberOfLines={2}>
            Cuisines: {workingArray[1].cuisines || "Not Listed"}
          </Text>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {workingArray[1].address}
          </Text>
          <Text
            style={styles.phone}
            onPress={() => phoneLink(workingArray[1].phone_numbers)}
            numberOfLines={2}
          >
            Phone: {phoneNumDisplay(workingArray[1].phone_numbers)}
          </Text>
          <Text style={styles.open} numberOfLines={4}>
            Open: {workingArray[1].timings}
          </Text>
          <Text style={styles.open} numberOfLines={1}>
            Avg price for two: ${workingArray[1].average_cost_for_two}
          </Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              continueGame(workingArray[1]);
              setStartFade(true);
              setStartFloatTwo(true);
            }}
          >
            <Text style={styles.button}>choose me</Text>
          </TouchableOpacity>
        </FadeOutView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  upperText: {
    flex: 0.15,
    fontSize: 15,
    color: colors.red,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: -20,
  },
  waiting: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginBottom: 60,
    height: "100%",
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: colors.red,
    borderWidth: 1,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 35 : 30,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "800",
    textAlign: "center",
    color: colors.red,
  },
  cuisines: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.pink,
  },
  address: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: colors.black,
  },
  phone: {
    fontSize: 16,
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

  touchable: {
    width: 300,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
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
    // marginTop: 5,
    height: "100%",
    alignSelf: "center",
  },
});

export default Game;
