import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
  import Constants from 'expo-constants';

  export const openInterstitial = async () => {
      console.log("openInterstitial")
    try {
        await AdMobInterstitial.setAdUnitID(adUnitID);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      console.log(err)
    }
  }
  
  // Set global test device ID
  await setTestDeviceIDAsync('EMULATOR');

const Interstitial = ({ navigation }) => {

    const productionID = Platform.select({
        ios: 'ca-app-pub-7728765463745066/8856488986',
        android: 'ca-app-pub-7728765463745066/2508726579',
      });

    const testID = Platform.select({
                // https://developers.google.com/admob/ios/test-ads
        ios: 'ca-app-pub-3940256099942544/5135589807', 
                // https://developers.google.com/admob/android/test-ads
        android: "ca-app-pub-3940256099942544/8691691433"
    }) ;
// Is a real device and running in production.
const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

    await AdMobInterstitial.setAdUnitID(adUnitID); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();

  return (
    <View style={styles.container}>
        
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
  }
});

export default Interstitial;
