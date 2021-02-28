import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AddFriends from "../components/addFriends/AddFriends";
import FriendsList from "../components/friendsList/FriendsList";

const FriendsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AddFriends navigation={navigation} />
      <FriendsList navigation={navigation} />
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

export default FriendsPage;
