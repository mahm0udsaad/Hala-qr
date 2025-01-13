import React, { useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const TextInputSheet = ({
  visible = false,
  onClose,
  onSubmit,
  initialText = "",
  isEditing = false,
}) => {
  const [text, setText] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    if (visible) {
      setText(initialText);
    }
  }, [visible, initialText]);

  const showSheet = useCallback(() => {
    setIsVisible(true);
    translateY.value = withSpring(0, {
      damping: 50,
      mass: 0.3,
      stiffness: 300,
      duration: 250,
    });
  }, [translateY]);

  const hideSheet = useCallback(() => {
    translateY.value = withSpring(
      SCREEN_HEIGHT,
      {
        damping: 50,
        mass: 0.3,
        stiffness: 300,
        duration: 250,
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsVisible)(false);
          runOnJS(setText)("");
        }
      },
    );
  }, [translateY]);

  useEffect(() => {
    if (visible) {
      showSheet();
    } else {
      hideSheet();
    }
  }, [visible, showSheet, hideSheet]);

  const handleClose = useCallback(() => {
    setText("");
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
      onClose?.();
    }
  }, [text, onSubmit, onClose]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backdrop} onPress={handleClose} />
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.sheetContainer}>
            <View style={styles.handle} />
            <View style={styles.header}>
              <Text style={styles.title}>
                {isEditing ? "Edit Text" : "Add Text"}
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Enter your text"
              multiline
              autoFocus
              placeholderTextColor="#94a3b8"
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText, styles.submitButtonText]}>
                  {isEditing ? "Update" : "Add"}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  keyboardView: {
    width: "100%",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 20,
    color: "#1e293b",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#e2e8f0",
  },
  submitButton: {
    backgroundColor: "#fbbf24",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#475569",
  },
  submitButtonText: {
    color: "#1e3a8a",
  },
});
