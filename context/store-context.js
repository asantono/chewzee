import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import { Alert } from "react-native";

export const StoreContext = React.createContext();

const StoreContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref("users/" + user.uid)
      .on("value", (snapshot) => {
        if (snapshot.exists()) setUser(snapshot.val());
      });

    return () =>
      firebase
        .database()
        .ref("users/" + user.uid)
        .off();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        restaurants,
        setRestaurants,
        startGame,
        setStartGame,
        change,
        setChange,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
