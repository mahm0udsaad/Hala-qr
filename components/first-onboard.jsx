import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const SplashScreen = ({ onSkip, onCreateAccount }) => {
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

  const handleCreateAccount = () => {
    onCreateAccount();
  };

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
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
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
    paddingTop: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  englishText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2563EB",
  },
  arabicText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#16A34A",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  createAccountButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 9999,
    paddingVertical: 12,
  },
  createAccountText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  skipButton: {
    backgroundColor: "#FACC15",
    borderRadius: 9999,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  skipText: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SplashScreen;
