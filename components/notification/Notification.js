// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, TextInput } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { useSelector, useDispatch } from "react-redux";
// import { colors } from "../../variables";

// const Notification = () => {
//   const { notification } = useSelector((state) => state.gameReducer);
//   const { user } = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();

//   return (
//     <View
//       style={{
//         height: notification ? "auto" : 0,
//         minWidth: "100%",
//         position: "absolute",
//         top: 0,
//         backgroundColor: colors.blue,
//         padding: notification ? 10 : 0,
//       }}
//     >
//       <Text>{notification}</Text>
//       <Text>{notification && notification.request.content.body}</Text>
//     </View>
//   );
// };

// export default Notification;
