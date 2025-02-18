import React, { useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Check } from "lucide-react-native";

export const EventSuccessModal = ({ visible, eventTitle }) => {
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContent, animatedStyle]}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <View style={styles.iconContainer}>
            <Check size={40} color="#4CAF50" />
          </View>
          <Text style={styles.title}>Event Created!</Text>
          <Text style={styles.subtitle}>{eventTitle}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
