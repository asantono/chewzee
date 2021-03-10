import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { colors } from "../../variables";

const GameList = ({ title, list, func, icon, iconFunc }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={list}
        initialNumToRender={10}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.uid}>
            <TouchableOpacity
              onPress={(e) => {
                func(item);
              }}
            >
              <Text style={styles.text}>
                {item.userOneEmail || item.userTwoEmail}
              </Text>
              <Text style={styles.text}>zip: {item.zip}</Text>
              <Text style={styles.text}>
                {moment(item.gameInitiated).format("MMM Do YYYY, h:mm a")}
              </Text>
            </TouchableOpacity>
            {!icon ? null : (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  iconFunc(item);
                }}
              >
                <View style={styles.delete}>
                  <Text style={styles.deleteText}>Delete</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: "80%",
    minWidth: "80%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.black,
  },
  delete: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  deleteText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
    padding: 4,
  },
  icon: {
    position: "relative",
    width: "100%",
    marginTop: 5,
    alignItems: "center",
    textAlign: "center",
    zIndex: 90000,
    backgroundColor: colors.red,
    borderRadius: 100,
    padding: 4,
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    fontWeight: "800",
    // height: 34,
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
    backgroundColor: colors.black,
  },
});

export default GameList;
