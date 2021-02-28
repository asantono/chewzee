import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../variables";
import { signup, login } from "../../api/auth";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState("signup");
  const { user } = useSelector((state) => state.userReducer);
  const { navigation } = props;

  useEffect(() => {
    if (user.uid) {
      navigation.replace("Home");
    }
  }, [user.uid]);

  const toggleSwitch = () => {
    signUp === "signup" ? setSignUp("login") : setSignUp("signup");
  };
  const doSignup = async () => {
    if (!email || !password) {
      alert("Please enter an email and password");
    }
    await signup(email, password);
  };

  const doLogin = async () => {
    if (!email || !password) {
      alert("Please enter an email and password");
    }
    await login(email, password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TextInput
        style={styles.textInput}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => (signUp === "signup" ? doSignup() : doLogin())}
      >
        <Text style={styles.button}>{signUp}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggle} onPress={() => toggleSwitch()}>
        {signUp === "signup" ? (
          <Text style={styles.toggleText}>Already have an account?</Text>
        ) : (
          <Text style={styles.toggleText}>Signup for an account?</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  textInput: {
    height: 40,
    width: 300,
    textAlign: "center",
    borderRadius: 1000,
    borderColor: colors.pink,
    borderWidth: 2,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
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
  toggleText: {
    color: colors.pink,
    marginTop: 10,
  },
});

export default Signup;
