import React from "react";
import { View, StyleSheet, Text, Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { colors } from "../../variables";
import Loading from "../loading/Loading";
import { addFriendToGame } from "../../api/game";

const FriendsList = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { gameId, userOne, userTwo } = useSelector(
    (state) => state.gameReducer
  );

  const addToGame = (friend) => {
    if (!gameId || (userOne && userTwo)) {
      Alert.alert(
        "Please start a game. You can select a friend after starting a new game"
      );
      return;
    }
    addFriendToGame(friend, user);
    if (user.pastGames.length) {
      if (user.pastGames.length < 2) {
        navigation.navigate("Instructions");
      } else navigation.replace("Game");
    } else navigation.navigate("Instructions");
  };

  return (
    <View style={styles.container}>
      <Loading />
      <Text style={styles.title}>Pick A Friend To Play</Text>
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
    flex: 1,
    paddingTop: 10,
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
