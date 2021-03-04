import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PastGameRecap from "../components/pastGames/PastGameRecap";
import { useSelector } from "react-redux";

const PastGameRecapPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);

  return (
    <View style={styles.container}>
      <PastGameRecap navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
  },
});

export default PastGameRecapPage;
