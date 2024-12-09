import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const SplashScreen = ({ onSkip }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 1000 }),
      withDelay(2000, withTiming(0, { duration: 1000 })),
    );
    translateY.value = withSequence(
      withTiming(0, { duration: 1000 }),
      withDelay(2000, withTiming(-50, { duration: 1000 })),
    );
  }, []);

  const animatedStyleEn = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const animatedStyleAr = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
    transform: [{ translateY: translateY.value * -1 }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.englishText, animatedStyleEn]}>
          Hala
        </Animated.Text>
        <Animated.Text style={[styles.arabicText, animatedStyleAr]}>
          مرحبا
        </Animated.Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    paddingTop: 160, // Tailwind's pt-40
    alignItems: "center",
    justifyContent: "center",
  },
  englishText: {
    fontSize: 48, // Tailwind's text-6xl (~48px)
    fontWeight: "bold", // Tailwind's font-bold
    color: "#2563EB", // Tailwind's text-blue-600
  },
  arabicText: {
    fontSize: 48, // Tailwind's text-6xl (~48px)
    fontWeight: "bold", // Tailwind's font-bold
    color: "#16A34A", // Tailwind's text-green-600
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20, // Tailwind's px-5 (5 * 4 = 20px)
    marginBottom: 32, // Tailwind's mb-8 (8 * 4 = 32px)
  },
  createAccountButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB", // Tailwind's bg-blue-600
    borderRadius: 9999, // Tailwind's rounded-full
    paddingVertical: 12, // Tailwind's py-3 (3 * 4 = 12px)
  },
  createAccountText: {
    color: "#FFFFFF", // Tailwind's text-white
    fontSize: 18, // Tailwind's text-lg (~18px)
    fontWeight: "600", // Tailwind's font-semibold
  },
  skipButton: {
    backgroundColor: "#FACC15", // Tailwind's bg-yellow-400
    borderRadius: 9999, // Tailwind's rounded-full
    paddingVertical: 12, // Tailwind's py-3 (3 * 4 = 12px)
    alignItems: "center",
    marginTop: 12, // Tailwind's mt-3 (3 * 4 = 12px)
  },
  skipText: {
    color: "#1F2937", // Tailwind's text-gray-800
    fontSize: 18, // Tailwind's text-lg (~18px)
    fontWeight: "600", // Tailwind's font-semibold
  },
});

export default SplashScreen;
