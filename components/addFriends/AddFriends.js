import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { findFriend, clearFriend } from "../../redux/actions/userActions";
import Loading from "../loading/Loading";
import { colors } from "../../variables";
import { addFollow } from "../../api/game";

const AddFriends = () => {
  const { user, tempFriend } = useSelector((state) => state.userReducer);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (tempFriend.msg) {
      Alert.alert(tempFriend.msg);
      dispatch(clearFriend());
    }
  }, [tempFriend]);

  const onFindFriend = () => {
    try {
      dispatch(findFriend(email, user));
      Keyboard.dismiss();
    } catch (err) {
      console.log(err);
    }
  };

  const onFollow = () => {
    addFollow(user, tempFriend);
  };
  return (
    <View style={tempFriend.email ? styles.containerFull : styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="myfriend@gmail.com"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => onFindFriend()} style={styles.touchable}>
        <Text style={styles.button}>Find A New Friend</Text>
      </TouchableOpacity>
      {tempFriend.email ? (
        <TouchableOpacity
          style={styles.touchableTwo}
          onPress={() => onFollow()}
        >
          <Text style={styles.found}>Found: {tempFriend.email}</Text>
          <Text style={styles.foundBlue} numberOfLines={2}>
            Add {tempFriend.email} to your friend list
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 10,
  },
  containerFull: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 10,
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
    fontSize: 20,
  },
  touchable: {
    width: 300,
    height: 40,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900,
  },
  touchableTwo: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  found: {
    fontSize: 16,
    fontWeight: "800",
    height: 20,
  },
  foundBlue: {
    fontSize: 16,
    color: colors.blueDark,
    fontWeight: "800",
  },
  button: {
    fontSize: 25,
    color: colors.white,
  },
  text: {
    fontSize: 20,
    color: colors.dark,
  },
});

export default AddFriends;
