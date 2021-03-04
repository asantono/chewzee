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
import { addFollow } from "../../api/game";
import { colors } from "../../variables";

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
    <View style={styles.container}>
      <Loading />
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
        <Text style={styles.button}>Find Friend</Text>
      </TouchableOpacity>
      {tempFriend.email ? (
        <TouchableOpacity
          style={styles.touchableTwo}
          onPress={() => onFollow()}
        >
          <Text style={styles.found}>Found: {tempFriend.email}</Text>
          <Text style={styles.foundBlue}>Add Friend</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "30%",
    minHeight: "15%",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
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
    marginTop: 20,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  touchableTwo: {
    width: 300,
    height: 80,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: colors.pink,
  },
  found: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    height: 30,
  },
  foundBlue: {
    marginTop: 10,
    fontSize: 20,
    color: colors.blueDark,
    fontWeight: "800",
  },
  button: {
    flex: 1,
    fontSize: 25,
    color: colors.white,
    marginTop: 5,
    height: "100%",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    color: colors.dark,
  },
});

export default AddFriends;
