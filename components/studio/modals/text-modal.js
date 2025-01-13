import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { ScreenSheet } from "./screenSheets";
import { useStudio } from "../context";

const fontFamilies = ["serif", "sans-serif", "monospace"];
const fontWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48];
const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  }
  return text;
};

export const TextStyleSheet = ({ visible, onClose, elementId }) => {
  const { state, dispatch } = useStudio();
  const element = state.elements.find((el) => el.id === elementId);

  const [selectedFamily, setSelectedFamily] = useState(
    element?.fontFamily || "serif",
  );
  const [selectedWeight, setSelectedWeight] = useState(
    element?.fontWeight || "normal",
  );
  const [selectedSize, setSelectedSize] = useState(element?.fontSize || 32);
  const [textColor, setTextColor] = useState(element?.color || "#000000");

  // Reset states when a new element is selected
  useEffect(() => {
    if (element) {
      setSelectedFamily(element.fontFamily || "serif");
      setSelectedWeight(element.fontWeight || "normal");
      setSelectedSize(element.fontSize || 32);
      setTextColor(element.color || "#000000");
    }
  }, [element]);

  // Apply changes in real-time
  useEffect(() => {
    if (elementId && visible) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: elementId,
          updates: {
            fontFamily: selectedFamily,
            fontWeight: selectedWeight,
            fontSize: selectedSize,
            color: textColor,
          },
        },
      });
    }
  }, [selectedFamily, selectedWeight, selectedSize, textColor]);

  const handleColorChange = (color) => {
    setTextColor(color.hex);
  };

  return (
    <ScreenSheet visible={visible} onClose={onClose}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Preview Section */}
        <View style={styles.previewContainer}>
          <Text
            style={[
              styles.previewTitle,
              {
                fontFamily: selectedFamily,
                fontWeight: selectedWeight,
                fontSize: selectedSize,
                color: textColor,
              },
            ]}
          >
            {truncateText(element?.text || "Preview Text", 3)}
          </Text>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <ColorPicker value={textColor} onComplete={handleColorChange}>
            <Panel1 style={styles.colorPicker} />
            <HueSlider style={styles.hueSlider} />
          </ColorPicker>
        </View>

        {/* Font Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Size</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.sizeButton}
              onPress={() => setSelectedSize((prev) => Math.max(12, prev - 2))}
            >
              <Text style={styles.sizeButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.sizeText}>{selectedSize}px</Text>
            <TouchableOpacity
              style={styles.sizeButton}
              onPress={() => setSelectedSize((prev) => Math.min(72, prev + 2))}
            >
              <Text style={styles.sizeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Font Family Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Family</Text>
          <View style={styles.optionsRow}>
            {fontFamilies.map((family) => (
              <TouchableOpacity
                key={family}
                style={[
                  styles.option,
                  selectedFamily === family && styles.selectedOption,
                ]}
                onPress={() => setSelectedFamily(family)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { fontFamily: family },
                    selectedFamily === family && styles.selectedOptionText,
                  ]}
                >
                  {family}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Font Weight Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Weight</Text>
          <View style={styles.optionsGrid}>
            {fontWeights.map((weight) => (
              <TouchableOpacity
                key={weight}
                style={[
                  styles.option,
                  selectedWeight === weight && styles.selectedOption,
                ]}
                onPress={() => setSelectedWeight(weight)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { fontWeight: weight },
                    selectedWeight === weight && styles.selectedOptionText,
                  ]}
                >
                  {weight}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  previewTitle: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4b5563",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  optionText: {
    color: "#4b5563",
    fontSize: 14,
  },
  selectedOptionText: {
    color: "#fff",
  },
  sizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeButtonText: {
    fontSize: 20,
    color: "#4b5563",
  },
  sizeText: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 60,
    textAlign: "center",
  },
  colorPicker: {
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  hueSlider: {
    height: 32,
    borderRadius: 8,
  },
  doneButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
