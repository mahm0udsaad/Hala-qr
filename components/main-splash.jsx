import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import GradientBackground from "./linearGradient";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SplashScreen = ({ onAnimationComplete }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1500 }, (finished) => {
      if (finished) {
        scale.value = withSequence(
          withTiming(1.1, { duration: 300, easing: Easing.inOut(Easing.quad) }),
          withTiming(
            1,
            { duration: 300, easing: Easing.inOut(Easing.quad) },
            (finished) => {
              if (finished) {
                runOnJS(onAnimationComplete)();
              }
            },
          ),
        );
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <AnimatedImage
          source={require("@/assets/svg/splash-logo.svg")}
          style={[styles.logo, animatedStyle]}
          resizeMode="contain"
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
