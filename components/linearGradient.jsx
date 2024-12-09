import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={["#EBC894", "#F6F5F4", "#D5CAF6"]} // Colors from the image
      start={{ x: 0, y: 0 }} // Top left corner
      end={{ x: 1, y: 1 }} // Bottom right corner
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default GradientBackground;
