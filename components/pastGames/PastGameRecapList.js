import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { colors } from "../../variables";

const PastGameRecapList = ({ title, list }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={list}
        initialNumToRender={16}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View key={item.uid} style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.cuisines}</Text>
            <Text style={styles.text}>Phone: {item.phone_numbers}</Text>
          </View>
        )}
      />
    </View>
  );
};

const windowHeight = Dimensions.get("window").height / 2.5;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: "94%",
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "solid",
    height: windowHeight,
    borderWidth: 2,
    borderColor: colors.black,
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    fontWeight: "800",
    width: "100%",
    textAlign: "center",
    borderStyle: "solid",
    color: colors.grey,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 6,
  },
  item: {
    width: "100%",
    padding: 4,
    marginVertical: 8,
    backgroundColor: colors.red,
  },
});

export default PastGameRecapList;
