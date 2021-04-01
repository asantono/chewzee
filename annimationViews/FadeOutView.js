import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";

const FadeOutView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const floatAnim = useRef(new Animated.Value(0)).current;
  const { startFade, setStartFade, startFloat, setStartFloat } = props;

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startFloatWait = async () => {
    setStartFade(false);
    await sleep(350);
    Animated.timing(floatAnim, {
      toValue: -0.1,
      useNativeDriver: true,
      duration: 300,
    }).start(),
      await sleep(300);
    Animated.timing(floatAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 600,
    }).start(),
      await sleep(600);
    Animated.timing(floatAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 0,
    }).start();
  };

  let yVal = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1000],
  });

  const fadeInWait = async () => {
    await sleep(1250);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
    setStartFade(false);
  };

  useEffect(() => {
    if (startFade) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
      fadeInWait();
      setStartFade(false);
    }
  }, [startFade]);

  useEffect(() => {
    if (startFloat) {
      setStartFloat(false);
      startFloatWait();
    }
  }, [startFloat]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,
        transform: [
          {
            translateY: yVal,
          },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeOutView;

// You can then use your `FadeInView` in place of a `View` in your components:
// export default () => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <FadeOutView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
//         <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
//       </FadeOutView>
//     </View>
//   );
// };
