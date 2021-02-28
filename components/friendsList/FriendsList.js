import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { addFriendToGame } from "../../api/game";
import { colors } from "../../variables";

const FriendsList = ({ navigation }) => {
  const { user, tempFriend } = useSelector((state) => state.userReducer);
  const { gameId, userOne, userTwo } = useSelector(
    (state) => state.gameReducer
  );

  const addToGame = (friend) => {
    if (!gameId || userOne || userTwo) {
      Alert.alert(
        "Please start a game. You can select a friend after starting a new game"
      );
      return;
    }
    addFriendToGame(friend, user);
    navigation.navigate("Game");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick A Friend</Text>
      <FlatList
        data={user.friends}
        initialNumToRender={10}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.uid}
            style={styles.item}
            onPress={() => {
              addToGame(item);
            }}
          >
            <Text style={styles.text}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: "70%",
    minWidth: "80%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.black,
  },
  text: {
    padding: 4,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    height: 34,
    width: "100%",
    textAlign: "center",
    borderStyle: "solid",
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.grey,
  },
  title: {
    fontSize: 20,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {},
});

export default FriendsList;
