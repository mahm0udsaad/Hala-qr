import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./first-onboard";
import GradientBackground from "./linearGradient";
import { LanguageSelectionScreen } from "./second-onboard";
import AuthScreen from "./auth-screen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomOnboarding = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [includeAuth, setIncludeAuth] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollX = useSharedValue(0);

  const handleLanguageSelect = async (language) => {
    await AsyncStorage.setItem("appLanguage", language);
  };

  const dotStyles = [0, 1, includeAuth ? 2 : 1].map((index) =>
    useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1.4, 0.8],
        "clamp",
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 1, 0.6],
        "clamp",
      );
      return { transform: [{ scale }], opacity };
    }),
  );

  const navigateToNextScreen = (screenIndex) => {
    scrollViewRef.current?.scrollTo({
      x: screenIndex * SCREEN_WIDTH,
      animated: true,
    });
    setCurrentPage(screenIndex);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            scrollX.value = offsetX;
            setCurrentPage(Math.round(offsetX / SCREEN_WIDTH));
          }}
          scrollEventThrottle={16}
        >
          {/* Splash Screen */}
          <View style={styles.pageContainer}>
            <SplashScreen
              onSkip={() => {
                setIncludeAuth(false);
                navigateToNextScreen(1); // Skip to LanguageSelectionScreen
              }}
              onCreateAccount={() => {
                setIncludeAuth(true);
                navigateToNextScreen(1); // Move to AuthScreen
              }}
            />
          </View>

          {/* Auth Screen (conditionally rendered) */}
          {includeAuth && (
            <View style={styles.pageContainer}>
              <AuthScreen
                onSuccess={() => navigateToNextScreen(2)} // Move to LanguageSelectionScreen
                onClose={() => setIncludeAuth(false)}
              />
            </View>
          )}

          {/* Language Selection Screen */}
          <View style={styles.pageContainer}>
            <LanguageSelectionScreen onSelectLanguage={handleLanguageSelect} />
          </View>
        </ScrollView>

        {(includeAuth ? currentPage > 1 : currentPage > 0) && (
          <TouchableOpacity onPress={onFinish} style={styles.finishButton}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
      <View style={styles.dotContainer}>
        {dotStyles.map((style, index) => (
          <Animated.View key={index} style={[styles.dot, style]} />
        ))}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    width: SCREEN_WIDTH,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3B82F6",
    marginHorizontal: 8,
  },
  finishButton: {
    position: "absolute",
    bottom: 80, // Tailwind's `bottom-20`
    right: 20, // Tailwind's `right-5`
    backgroundColor: "#3B82F6", // Tailwind's `bg-blue-500`
    paddingVertical: 12, // Tailwind's `py-3`
    paddingHorizontal: 24, // Tailwind's `px-6`
    borderRadius: 9999, // Tailwind's `rounded-full`
  },
  finishButtonText: {
    color: "#FFFFFF", // Tailwind's `text-white`
    fontWeight: "bold", // Tailwind's `font-bold`
    textAlign: "center",
  },
});

export default CustomOnboarding;
