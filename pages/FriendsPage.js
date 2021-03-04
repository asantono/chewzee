import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AddFriends from "../components/addFriends/AddFriends";
import FriendsList from "../components/friendsList/FriendsList";
import { useSelector } from "react-redux";

const FriendsPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);

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
