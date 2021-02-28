import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { pushToken } from "../../api/auth";
import { pushNotification } from "../../redux/actions/gameActions";
import { colors } from "../../variables";
import { TouchableOpacity } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function Push() {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { user } = useSelector((state) => state.userReducer);
  const { body, title } = useSelector((state) => state.gameReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Constants.isDevice) {
      registerForPushNotificationsAsync().then((token) =>
        pushToken(token, user)
      );

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          dispatch(pushNotification(notification));
          // setNotification(notification);
        }
      );

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  }, []);

  return (
    <View
      style={{
        height: title ? "auto" : 0,
        alignSelf: "flex-start",
        minHeight: 0,
        minWidth: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      <TouchableOpacity
        style={{
          padding: title ? 10 : 0,
          backgroundColor: colors.blue,
        }}
        onPress={() => {
          dispatch(pushNotification({}));
        }}
      >
        <AntDesign
          style={{
            position: "absolute",
            fontSize: 25,
            color: colors.white,
            marginLeft: 20,
            marginTop: 15,
            height: title ? "auto" : 0,
          }}
          name="closecircleo"
        />
        <View style={styles.notification}>
          <Text>{title}</Text>
          <Text>{body}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  x: {
    position: "absolute",
    fontSize: 25,
    color: colors.white,
    marginLeft: 20,
    marginTop: 15,
  },
  notification: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Let's Play",
    body: "You have a new game invite!",
    // data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
