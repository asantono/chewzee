import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import * as Location from "expo-location";
import { setLoading } from "../../redux/actions/loadingActions";
import { goFalse, setRestaurants } from "../../redux/actions/gameActions";
import useZipToCoordinates from "../../customHooks/zip/useZipToCoordinates";
import { colors } from "../../variables";
import Loading from "../loading/Loading";

const Search = (props) => {
  const [text, setText] = useState("");
  const { navigation } = props;
  const { user } = useSelector((state) => state.userReducer);
  const { goTo, start } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (goTo === "addFriend") {
      dispatch(goFalse());
      navigation.navigate("Friends");
    }
  }, [goTo]);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    const loadId = uuid();
    dispatch(setLoading(loadId));
    if (status !== "granted") {
      dispatch(setLoading(loadId));
      Alert.alert(
        "zip code search is only available in the United States. Location services are available elsewhere"
      );

      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLoading(loadId));
      onSearch(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      console.log(err);
      dispatch(setLoading(loadId));
      Alert.alert("Error accessing location services");
    }
  };

  const onSearch = (autoLat, autoLng) => {
    Keyboard.dismiss();
    try {
      if (!autoLat) {
        const { zip, lat, lng } = useZipToCoordinates(text);
        if (!zip) {
          Alert.alert("zip code not found");
          return;
        }
        dispatch(setRestaurants(user, lat, lng, zip, start));
      } else
        dispatch(
          setRestaurants(user, autoLat, autoLng, "location services", start)
        );
    } catch (err) {
      Alert.alert("An error has occured. Please try again later");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Loading />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setText(text)}
        value={text.toString()}
        placeholder="zip code"
        keyboardType={"numeric"}
      />
      <Ionicons name="search-outline" style={styles.search} />
      <TouchableOpacity onPress={() => onSearch()} style={styles.touchable}>
        <Text style={styles.button}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getLocation()}
        style={styles.touchableBlue}
      >
        <Text style={styles.button}>Get My Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: "center",
    justifyContent: "space-between",
    width: 420,
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
  search: {
    position: "absolute",
    right: 75,
    top: 7,
    fontSize: 25,
    color: colors.red,
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

export default Search;
