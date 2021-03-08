import React, { useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import Search from "../components/search/Search";
import { colors } from "../variables";
import { useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SearchPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!user.uid) {
      navigation.replace("Signup");
    }
  }, [user.uid]);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      onPress={() => Keyboard.dismiss()}
    >
      <Text style={styles.title}>Enter A Zip Code</Text>
      <Text style={styles.text}>chewzee will find you nearby restaurants</Text>
      <Search navigation={navigation} />
      <Text style={styles.textBottomTop}>
        Zip search is limited to the United States
      </Text>
      <Text style={styles.textBottom}>
        Get My Location works all over the world
      </Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    paddingBottom: 15,
    color: colors.red,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 20,
  },
  textBottom: {
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 16,
    fontStyle: "italic",
  },
  textBottomTop: {
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 30,
    fontStyle: "italic",
  },
});

export default SearchPage;
