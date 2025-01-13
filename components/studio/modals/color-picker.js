import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { BottomSheet } from "./index";

export const ColorPickerSheet = ({
  visible,
  onClose,
  onColorSelect,
  initialColor,
}) => {
  const [selectedColor, setSelectedColor] = React.useState(initialColor);

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Color</Text>
        <ColorPicker
          value={selectedColor}
          onComplete={({ hex }) => setSelectedColor(hex)}
        >
          <Panel1 style={styles.colorPicker} />
          <HueSlider style={styles.hueSlider} />
        </ColorPicker>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={() => {
              onColorSelect(selectedColor);
              onClose();
            }}
          >
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              Done
            </Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  colorPicker: {
    width: "100%",
    height: 130,
  },
  hueSlider: {
    marginTop: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 10,
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
