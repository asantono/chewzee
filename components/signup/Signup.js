import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../variables";
import { signup, login, passwordReset } from "../../api/auth";

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
  const doSignup = () => {
    if (!email || !password) {
      alert("Please enter an email and password");
    }
    signup(email.toString().trim(), password.toString().trim());
  };

  const doLogin = () => {
    if (!email || !password) {
      alert("Please enter an email and password");
    }
    login(email.toString().trim(), password.toString().trim());
  };

  const forgotPassword = () => {
    if (!email) {
      alert("Please enter the email associated with your account");
      return;
    } else passwordReset(email);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
          value={email}
          placeholder="email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
          placeholder="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => (signUp === "signup" ? doSignup() : doLogin())}
        >
          <Text style={styles.button}>{signUp}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => navigation.navigate("TermsAndConditions")}
        >
          <Text style={styles.toggleTextSmall}>
            Terms and conditions are agreed to by authenticating
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => forgotPassword()}
        >
          <Text style={styles.toggleText}>forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggle} onPress={() => toggleSwitch()}>
          {signUp === "signup" ? (
            <Text style={styles.toggleTextBlue}>Already have an account?</Text>
          ) : (
            <Text style={styles.toggleTextBlue}>Signup for an account?</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 900000,
  },
  toggleText: {
    color: colors.orange,
    marginTop: 10,
    fontSize: 16,
  },
  toggleTextSmall: {
    color: colors.pink,
    marginTop: 10,
  },
  toggleTextBlue: {
    color: colors.blue,
    marginTop: 10,
    fontSize: 16,
  },
});

export default Signup;
