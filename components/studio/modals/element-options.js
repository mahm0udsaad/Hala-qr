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
import { Canvas } from "@shopify/react-native-skia";
import { CanvasElement, CanvasElementPreview } from "../elements";

const styleOptions = ["fill", "stroke"];

export const ElementStyleSheet = ({ visible, onClose, elementId }) => {
  const { state, dispatch } = useStudio();
  const element = state.elements.find((el) => el.id === elementId);

  const [color, setColor] = useState(element?.color || "#000000");
  const [style, setStyle] = useState(element?.style || "fill");
  const [strokeWidth, setStrokeWidth] = useState(element?.strokeWidth || 2);
  const [strokeJoin, setStrokeJoin] = useState(element?.strokeJoin || "round");
  const [strokeCap, setStrokeCap] = useState(element?.strokeCap || "round");
  const [opacity, setOpacity] = useState(element?.opacity || 1);

  // Reset states when a new element is selected
  useEffect(() => {
    if (element) {
      setColor(element.color || "#000000");
      setStyle(element.style || "fill");
      setStrokeWidth(element.strokeWidth || 2);
      setStrokeJoin(element.strokeJoin || "round");
      setStrokeCap(element.strokeCap || "round");
      setOpacity(element.opacity || 1);
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
            color,
            style,
            strokeWidth,
            strokeJoin,
            strokeCap,
            opacity,
          },
        },
      });
    }
  }, [color, style, strokeWidth, strokeJoin, strokeCap, opacity]);

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleOpacityChange = (value) => {
    setOpacity(Math.max(0, Math.min(1, value)));
  };

  return (
    <ScreenSheet visible={visible} onClose={onClose}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Preview Section */}
        <View style={styles.previewContainer}>
          {element && (
            <Canvas width={100} height={100}>
              <CanvasElementPreview element={element} />
            </Canvas>
          )}
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <ColorPicker value={color} onComplete={handleColorChange}>
            <Panel1 style={styles.colorPicker} />
            <HueSlider style={styles.hueSlider} />
          </ColorPicker>
        </View>

        {/* Style Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style</Text>
          <View style={styles.optionsRow}>
            {styleOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  style === option && styles.selectedOption,
                ]}
                onPress={() => setStyle(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    style === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stroke Width Selection */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "98%",
            gap: 6,
          }}
        >
          {style === "stroke" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Stroke Width</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.sizeButton}
                  onPress={() =>
                    setStrokeWidth((prev) => Math.max(1, prev - 1))
                  }
                >
                  <Text style={styles.sizeButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sizeText}>{strokeWidth}px</Text>
                <TouchableOpacity
                  style={styles.sizeButton}
                  onPress={() =>
                    setStrokeWidth((prev) => Math.min(20, prev + 1))
                  }
                >
                  <Text style={styles.sizeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Opacity Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opacity</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => handleOpacityChange(opacity - 0.1)}
              >
                <Text style={styles.sizeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sizeText}>{Math.round(opacity * 100)}%</Text>
              <TouchableOpacity
                style={styles.sizeButton}
                onPress={() => handleOpacityChange(opacity + 0.1)}
              >
                <Text style={styles.sizeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
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
    minHeight: 120,
  },
  previewShape: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#000000",
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
    gap: 6,
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
    height: 150,
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
