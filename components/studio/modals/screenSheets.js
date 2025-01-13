import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X } from "lucide-react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
  Easing,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.9;
const MINIMUM_HEIGHT = SCREEN_HEIGHT * 0.5;

export const ScreenSheet = ({ visible, onClose, children }) => {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.2, 0.65, 0.5, 0.9),
      });
    } else {
      translateY.value = withTiming(
        SHEET_HEIGHT,
        {
          duration: 200,
          easing: Easing.bezier(0.4, 0, 1, 1),
        },
        () => {
          runOnJS(onClose)();
        },
      );
    }
  }, [visible]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(event.translationY + context.value.y, 0);
    })
    .onEnd((event) => {
      if (translateY.value > MINIMUM_HEIGHT || event.velocityY > 500) {
        translateY.value = withTiming(
          SHEET_HEIGHT,
          {
            duration: 200,
            easing: Easing.bezier(0.4, 0, 1, 1),
          },
          () => {
            runOnJS(onClose)();
          },
        );
      } else {
        translateY.value = withTiming(0, {
          duration: 200,
          easing: Easing.bezier(0.2, 0.65, 0.5, 0.9),
        });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleClose = () => {
    translateY.value = withTiming(
      SHEET_HEIGHT,
      {
        duration: 200,
        easing: Easing.bezier(0.4, 0, 1, 1),
      },
      () => {
        runOnJS(onClose)();
      },
    );
  };

  return (
    <>
      {visible && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.sheet, sheetStyle, { flex: 1 }]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={24} color="#4b5563" />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: 40 },
              ]}
              bounces={false}
              showsVerticalScrollIndicator={true}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  gestureRoot: {
    flex: 1,
  },
  sheet: {
    position: "absolute",
    top: SCREEN_HEIGHT - SHEET_HEIGHT,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
  closeButton: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    position: "absolute",
    right: 16,
    top: 8,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});
