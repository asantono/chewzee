import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import * as firebase from "firebase";
import {
  gameUpdate,
  setWinnersArray,
  setWorkingArray,
} from "../../redux/actions/gameActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Linking from "expo-linking";
import { updateGame, winnerWork, updateRound, gameOver } from "../../api/game";
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
    workingArray,
    winnersArray,
    workingOffArrayNum,
    winner,
    round,
  } = useSelector((state) => state.gameReducer);
  const { user } = useSelector((state) => state.userReducer);

  let heightScaled = 650;

  useEffect(() => {
    const window = Dimensions.get("window");
    heightScaled = window.height / window.fontScale;
  }, []);

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
      if (snapshot.exists()) {
        dispatch(
          gameUpdate({
            game: snapshot.val(),
            user,
            newCards: false,
          })
        );
      }
    });
    return () => ref.off("value", listener);
  }, [gameId]);

  // ALL GAME LOGIC ON PAGE: REST IN GAMEREDUCER
  // Allow the restaurants arrays to shift each round

  useEffect(() => {
    if (winner.name) {
      gameOver(user);
      navigation.replace("Recap");
      return;
    }
    if (restaurants.arr1.length === restaurants.arr2.length) {
      let newRound;
      switch (round) {
        case 1:
          if (restaurants.arr1.length === 4) {
            newRound = 2;
            updateRound(user, newRound);
          }
          break;
        case 2:
          if (restaurants.arr1.length === 2) {
            newRound = 3;
            updateRound(user, newRound);
          }
          break;
        case 3:
          if (restaurants.arr1.length === 1) {
            newRound = 4;
            updateRound(user, newRound);
          }
          break;
        default:
          break;
      }
    }
  }, [restaurants, round, winner]);

  const continueGame = async (choice) => {
    // save current winners array incase of round change
    const currentWinnersArray = [...winnersArray];
    // set the winners array
    dispatch(setWinnersArray([...winnersArray, choice]));
    // check for value
    if (!choice) return;
    // start animation
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    await sleep(1250);

    // check if game is over
    if (
      restaurants.arr1.length === 1 &&
      restaurants.arr2.length === 1 &&
      user.uid !== userOne
    ) {
      // create winner if game is over
      dispatch(setWinnersArray([]));
      dispatch(setWorkingArray([]));
      winnerWork(user, choice);
      return;
    }
    // if the round is over for player 1
    if (!workingArray[2]) {
      // reset working arr and update the db
      dispatch(setWorkingArray([]));
      // Do update here incase Redux has not fired
      let updatedWinnersArray = [...currentWinnersArray, choice];
      // if the round is over
      updateGame(user, updatedWinnersArray, workingOffArrayNum);
      dispatch(setWinnersArray([]));
      return;
    } else {
      let copyArr = [...workingArray];
      // Remove the two first items from the working array
      copyArr = copyArr.slice(2);
      // Update working array
      dispatch(setWorkingArray(copyArr));
      // choice already added to winners array up top
      return;
    }
  };

  // ALL GAME LOGIC OVER

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
      <View style={styles.textView}>
        <Text style={styles.roundText}>
          Round: {round === 4 ? "Final Round" : round}
        </Text>
        <Text
          style={styles.upperText}
          numberOfLines={heightScaled > 900 ? 2 : 1}
        >
          With: {email} in Zip: {zip}
        </Text>
      </View>
      {workingArray[0].hideButton ? (
        <View style={styles.waiting}>
          <Text style={styles.title}>{workingArray[0].name}</Text>
          <Text style={styles.cuisines} numberOfLines={1}>
            {workingArray[0].cuisines}
          </Text>
        </View>
      ) : (
        <FadeOutView
          style={
            workingArray[1].name === "Waiting for Player 2"
              ? styles.cardCenter
              : styles.card
          }
          startFade={startFade}
          setStartFade={setStartFade}
          startFloat={startFloat}
          setStartFloat={setStartFloat}
        >
          <Text style={styles.title} numberOfLines={heightScaled > 900 ? 2 : 1}>
            {workingArray[0].name}
          </Text>
          <Text style={styles.cuisines} numberOfLines={2}>
            {workingArray[0].name === "Waiting for Player 2"
              ? workingArray[0].cuisines || "Not Listed"
              : `Cuisines: ${workingArray[0].cuisines}` || "Not Listed"}
          </Text>
          {workingArray[0].name === "Waiting for Player 2" ? null : (
            <Text
              style={styles.address}
              numberOfLines={heightScaled > 700 ? 2 : 1}
            >
              {workingArray[0].address}
            </Text>
          )}
          {workingArray[0].name === "Waiting for Player 2" ? null : (
            <Text
              style={styles.phone}
              numberOfLines={2}
              onPress={() => phoneLink(workingArray[0].phone_numbers)}
            >
              Phone: {phoneNumDisplay(workingArray[0].phone_numbers)}
            </Text>
          )}
          {workingArray[0].name === "Waiting for Player 2" ? null : (
            <Text
              style={styles.open}
              numberOfLines={heightScaled > 900 ? 5 : 3}
            >
              Open: {workingArray[0].timings}
            </Text>
          )}
          {workingArray[0].name === "Waiting for Player 2" ? null : (
            <Text style={styles.open} numberOfLines={1}>
              Avg price for two: ${workingArray[0].average_cost_for_two}
            </Text>
          )}
          {workingArray[0].name === "Waiting for Player 2" ? null : (
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
          )}
        </FadeOutView>
      )}

      {workingArray[1].name === "Waiting for Player 2" ? null : (
        <FadeOutView
          style={styles.card}
          startFade={startFadeTwo}
          setStartFade={setStartFadeTwo}
          startFloat={startFloatTwo}
          setStartFloat={setStartFloatTwo}
        >
          <Text style={styles.title} numberOfLines={heightScaled > 900 ? 2 : 1}>
            {workingArray[1].name}
          </Text>

          <Text style={styles.cuisines} numberOfLines={2}>
            Cuisines: {workingArray[1].cuisines || "Not Listed"}
          </Text>
          <Text
            style={styles.address}
            numberOfLines={heightScaled > 700 ? 2 : 1}
            ellipsizeMode="tail"
          >
            {workingArray[1].address}
          </Text>
          <Text
            style={styles.phone}
            onPress={() => phoneLink(workingArray[1].phone_numbers)}
            numberOfLines={2}
          >
            Phone: {phoneNumDisplay(workingArray[1].phone_numbers)}
          </Text>
          <Text style={styles.open} numberOfLines={heightScaled > 900 ? 5 : 3}>
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
  textView: {
    display: "flex",
    flex: 0.17,
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  },
  upperText: {
    fontSize: 15,
    color: colors.red,
    fontWeight: "800",
  },
  roundText: {
    fontSize: 20,
    color: colors.red,
    fontWeight: "800",
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
  cardCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: colors.red,
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
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
    fontSize: 25,
    color: colors.white,
  },
});

export default Game;
