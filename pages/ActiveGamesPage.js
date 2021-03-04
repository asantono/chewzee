import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActiveGames from "../components/activeGames/ActiveGames";
import { colors } from "../variables";
import { useSelector } from "react-redux";

const ActiveGamesPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);

  return (
    <View style={styles.container}>
      <ActiveGames navigation={navigation} />
      <TouchableOpacity onPress={() => navigation.navigate("PastGames")}>
        <Text style={styles.link}>see past games</Text>
      </TouchableOpacity>
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
  link: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
    color: colors.blueDark,
  },
});

export default ActiveGamesPage;
