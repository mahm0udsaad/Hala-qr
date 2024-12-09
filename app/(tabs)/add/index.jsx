import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/linearGradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function CreateNewDesignModal() {
  const { t } = useTranslation();
  // Shared value to control the scale (pop-up effect)
  const scale = useSharedValue(0);
  const router = useRouter();
  // Modal pop-up animation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    // Trigger the pop-up effect for the modal when component mounts
    scale.value = withTiming(1, { duration: 300 }); // Basic timing animation for the pop-up
  }, []);

  return (
    <GradientBackground>
      <Animated.View
        style={[
          styles.animatedContainer,
          animatedStyle, // Apply the pop-up effect
        ]}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t("createNewDesign")}</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionTouchable}
              onPress={() => router.push("/add/whiteboard")}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="pencil" size={40} color="#FFDA78" />
              </View>
              <Text style={styles.optionText}>{t("whiteboard")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionTouchable}
              onPress={() => router.push("/add/templates")}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="grid" size={40} color="#FFDA78" />
              </View>
              <Text style={styles.optionText}>{t("templates")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: "white",
    padding: 32,
    borderRadius: 8,
    width: "80%",
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionTouchable: {
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#1E3A8A", // blue-800
    padding: 12,
    borderRadius: 4,
  },
  optionText: {
    marginTop: 8,
  },
});
