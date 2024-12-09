import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const predefinedColors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#8B00FF",
  "#000000",
  "#FFFFFF",
];

export function ColorPicker({ color, onColorChange }) {
  const [customColor, setCustomColor] = useState(color);

  const handleColorPress = (selectedColor) => {
    onColorChange(selectedColor);
  };

  const handleCustomColorChange = (text) => {
    setCustomColor(text);
    if (text.length === 7 && text.startsWith("#")) {
      onColorChange(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.colorGrid}>
        {predefinedColors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorButton, { backgroundColor: c }]}
            onPress={() => handleColorPress(c)}
          />
        ))}
      </View>
      <View style={styles.customColorContainer}>
        <Text style={styles.label}>Custom Color:</Text>
        <TextInput
          style={styles.input}
          value={customColor}
          onChangeText={handleCustomColorChange}
          placeholder="#RRGGBB"
          maxLength={7}
        />
      </View>
      <View style={styles.previewContainer}>
        <Text style={styles.label}>Selected Color:</Text>
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  colorButton: {
    width: "23%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  customColorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
