import React from "react";
import { StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import Search from "../components/search/Search";
import { colors } from "../variables";

const SearchPage = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Enter A Zip Code</Text>
      <Text style={styles.text}>Chewzee will find you nearby restaurants</Text>
      <Search navigation={navigation} />
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
});

export default SearchPage;
