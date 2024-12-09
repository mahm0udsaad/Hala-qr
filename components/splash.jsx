import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import GradientBackground from "@/components/linearGradient"; // Adjust the path as needed

const SplashScreen = () => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hala</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleContainer: {
    paddingTop: 32, // Tailwind's pt-8 (8 * 4 = 32px)
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40, // Tailwind's text-5xl is ~40px
    fontWeight: "bold", // Tailwind's font-bold
    color: "#1D4ED8", // Tailwind's text-blue-700
  },
  buttonContainer: {
    marginTop: 64, // Tailwind's mt-16 (16 * 4 = 64px)
    width: "100%",
    paddingHorizontal: 32, // Tailwind's px-8 (8 * 4 = 32px)
  },
  createAccountButton: {
    backgroundColor: "#1D4ED8", // Tailwind's bg-blue-700
    paddingVertical: 16, // Tailwind's py-4 (4 * 4 = 16px)
    borderRadius: 8, // Tailwind's rounded-lg
    marginBottom: 16, // Tailwind's mb-4 (4 * 4 = 16px)
  },
  createAccountText: {
    color: "#FFFFFF", // Tailwind's text-white
    textAlign: "center",
    fontSize: 18, // Tailwind's text-lg is ~18px
  },
  skipButton: {
    backgroundColor: "#FACC15", // Tailwind's bg-yellow-400
    paddingVertical: 16, // Tailwind's py-4 (4 * 4 = 16px)
    borderRadius: 8, // Tailwind's rounded-lg
  },
  skipText: {
    textAlign: "center",
    fontSize: 18, // Tailwind's text-lg is ~18px
  },
});

export default SplashScreen;
