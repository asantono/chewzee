import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Landing from "../components/landing/Landing";
import { useSelector } from "react-redux";

const LandingPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);
  return (
    <View style={styles.container}>
      <Landing navigation={navigation} />
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

export default LandingPage;
