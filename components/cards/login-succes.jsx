import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useUser } from "../../context";

const LoginSuccessCard = () => {
  const { user } = useUser();
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  useEffect(() => {
    scale.value = withTiming(1, { duration: 300 });

    const timer = setTimeout(() => {
      scale.value = withTiming(0, { duration: 300 }, () => {});
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[styles.card, animatedStyle]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text style={styles.title}>Login Successful!</Text>
      <Text style={styles.subtitle}>Welcome {user?.f_name || "User"}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
  },
});

export default LoginSuccessCard;
