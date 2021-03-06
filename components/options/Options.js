import React from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../variables";
import { updateStart } from "../../redux/actions/gameActions";
import { logout } from "../../api/auth";

const Options = ({ navigation }) => {
  const doLogout = async () => {
    logout();
  };

  const { user } = useSelector((state) => state.userReducer);
  const { start } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  if (!user) user = {};

  const setText = (start) => {
    if (start > 1000) {
      Alert.alert("Sorry, you can only skip the closest 1,000 restaurants");
      return;
    }
    dispatch(updateStart(start));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Currently skipping the closest {start} restaurants
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(start) => setText(start)}
        value={start === 0 ? "" : `${start}`}
        placeholder="0"
        keyboardType={"numeric"}
      />
      <Text style={styles.title}>Player: {user.email}</Text>
      <View>
        <TouchableOpacity
          style={styles.touchableBlue}
          onPress={() => navigation.navigate("ActiveGames")}
        >
          <Text style={styles.button}>active games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOrange}
          onPress={() => navigation.navigate("PastGames")}
        >
          <Text style={styles.button}>past games</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => doLogout()}>
          <Text style={styles.button}>logout</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 50,
  },
  title: {
    fontSize: 16,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "800",
    textAlign: "center",
    color: colors.black,
  },
  textInput: {
    height: 40,
    width: 300,
    textAlign: "center",
    borderRadius: 1000,
    borderColor: colors.red,
    borderWidth: 2,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 25,
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    fontSize: 25,
    color: colors.white,
    marginTop: 5,
    height: "100%",
    alignSelf: "center",
  },
  touchable: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  touchableBlue: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  touchableOrange: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
});

export default Options;
