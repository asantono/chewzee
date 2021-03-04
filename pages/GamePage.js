import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AdMobInterstitial } from "expo-ads-admob";
import Constants from "expo-constants";
import Game from "../components/game/Game";
import Push from "../utils/push/Push";
import { colors } from "../variables";

const GamePage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);

  const { roundOver } = useSelector((state) => state.gameReducer);
  const { pastGames } = user;

  // TURN ON FOR ADS
  // useEffect(() => {
  //   if (pastGames.length < 2) return;
  //   if (roundOver) {
  //     let serveAd = getRandomInt(10);
  //     console.log(serveAd);
  //     if (serveAd > 5) {
  //       openInterstitial();
  //     }
  //   }
  // }, [roundOver]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const productionID = Platform.select({
    ios: "ca-app-pub-7728765463745066/8856488986",
    android: "ca-app-pub-7728765463745066/2508726579",
  });

  const testID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: "ca-app-pub-3940256099942544/5135589807",
    // https://developers.google.com/admob/android/test-ads
    android: "ca-app-pub-3940256099942544/8691691433",
  });
  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

  const openInterstitial = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(adUnitID);
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Push />
      <Game navigation={navigation} />
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
  upperText: {
    fontSize: 15,
    color: colors.red,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: -10,
  },
});

export default GamePage;
