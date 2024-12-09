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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomOnboarding = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const scrollX = useSharedValue(0);

  const handleSkip = () => {
    if (currentPage === 0) {
      scrollViewRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: true });
    }
  };

  const handleLanguageSelect = async (language) => {
    await AsyncStorage.setItem("appLanguage", language);
  };

  const handleFinish = () => {
    onFinish();
  };

  const pages = [
    {
      key: "splash",
      component: <SplashScreen onSkip={handleSkip} />,
    },
    {
      key: "languageSelection",
      component: (
        <LanguageSelectionScreen onSelectLanguage={handleLanguageSelect} />
      ),
    },
  ];

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;
    setCurrentPage(Math.round(offsetX / SCREEN_WIDTH));
  };

  const dotStyle = (index) =>
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
      return {
        transform: [{ scale }],
        opacity,
      };
    });

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {pages.map((page) => (
            <View key={page.key} style={styles.pageContainer}>
              {page.component}
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotContainer}>
          {pages.map((_, index) => (
            <Animated.View key={index} style={[styles.dot, dotStyle(index)]} />
          ))}
        </View>

        {currentPage === pages.length - 1 && (
          <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
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
    bottom: 40, // Tailwind's `bottom-10`
    left: 0,
    right: 0,
  },
  dot: {
    width: 12, // Tailwind's `w-3`
    height: 12, // Tailwind's `h-3`
    borderRadius: 6, // Tailwind's `rounded-full`
    backgroundColor: "#3B82F6", // Tailwind's `bg-blue-500`
    marginHorizontal: 8, // Tailwind's `mx-2`
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
