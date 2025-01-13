// BottomSheet.js
import { X } from "lucide-react-native";
import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.45;

export const BottomSheet = ({ visible, onClose, children }) => {
  const translateY = useSharedValue(SHEET_HEIGHT);

  React.useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
    } else {
      translateY.value = withSpring(SHEET_HEIGHT, {}, () => {
        runOnJS(onClose)();
      });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      {visible && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.sheet, sheetStyle]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={24} color="#4b5563" />
              </TouchableOpacity>
            </View>
            {children}
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
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: SHEET_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
});
