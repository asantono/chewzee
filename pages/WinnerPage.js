// import React, { useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import { useSelector } from "react-redux";
// import Winners from "../components/winner/Winner";

// const WinnerPage = ({ navigation }) => {
//   const { user } = useSelector((state) => state.userReducer);
//   useEffect(() => {
//     if (!user.uid) {
//       navigation.replace("Signup");
//     }
//   }, [user.uid]);

//   return (
//     <View style={styles.container}>
//       <Winners navigation={navigation} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     height: "100%",
//   },
// });

// export default WinnerPage;
