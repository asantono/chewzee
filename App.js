import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "./variables";
import { TouchableOpacity } from "react-native-gesture-handler";

import SearchPage from "./pages/SearchPage";
import Options from "./pages/OptionsPage";
import Card from "./components/card/Card";
import Signup from "./components/signup/Signup";

import { firebaseConfig } from "./firebase";
import * as firebase from "firebase";
import "firebase/functions";
import Listen from "./components/listen/Listen";
import UserListener from "./components/listen/UserListener";
import FriendsPage from "./pages/FriendsPage";
import GamePage from "./pages/GamePage";
import ActiveGamesPage from "./pages/ActiveGamesPage";
import PastGamesPage from "./pages/PastGamesPage";
import LandingPage from "./pages/LandingPage";
import InstructionsPage from "./pages/InstructionsPage";
import PastGameRecapPage from "./pages/PastGameRecapPage";
import TermsAndConditions from "./pages/TermsAndConditions";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Listen />
        <UserListener />
        <Nav />
      </Provider>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            color = focused ? colors.red : colors.greyFaded;
            size = 30;
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Search") {
            color = focused ? colors.red : colors.greyFaded;
            size = 38;
            iconName = focused
              ? "md-search-circle-sharp"
              : "md-search-circle-outline";
          } else if (route.name === "Friends") {
            color = focused ? colors.red : colors.greyFaded;
            size = 34;
            iconName = focused ? "people-sharp" : "people-outline";
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{ marginTop: 12, height: "100%" }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsPage}
        options={{ tabBarLabel: "" }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          title: "chewzee",
          headerStyle: {
            backgroundColor: colors.red,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
            color: colors.white,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons
              style={styles.back}
              name="chevron-back"
              size={24}
              color="black"
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Ionicons style={styles.icon} name="options" size={24} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="Home" component={TabNav} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerBackTitleVisible: false,
            headerBackImage: () => null,
            headerRight: () => null,
            tabBarVisible: false,
          }}
        />
        <Stack.Screen name="Instructions" component={InstructionsPage} />
        <Stack.Screen
          name="Game"
          component={GamePage}
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
        <Stack.Screen name="ActiveGames" component={ActiveGamesPage} />
        <Stack.Screen name="PastGames" component={PastGamesPage} />
        <Stack.Screen
          name="Recap"
          component={PastGameRecapPage}
          options={({ navigation }) => ({
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={Options} />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    fontSize: 25,
    color: colors.white,
    marginRight: 20,
  },
  back: {
    fontSize: 30,
    color: colors.white,
    marginLeft: 10,
  },
});
