import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  Switch,
} from "react-native";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

const ShapeCustomizationModal = ({
  visible,
  onClose,
  shapeType,
  currentColor,
  currentRadius,
  currentShadow,
  currentStrokeWidth,
  currentFilled,
  onCustomize,
}) => {
  const [backgroundColor, setBackgroundColor] = useState(currentColor);
  const [borderRadius, setBorderRadius] = useState(currentRadius);
  const [shadowType, setShadowType] = useState(currentShadow);
  const [strokeWidth, setStrokeWidth] = useState(currentStrokeWidth);
  const [isFilled, setIsFilled] = useState(currentFilled);

  const shadowOptions = [
    { type: "none", label: "No Shadow" },
    { type: "inner", label: "Inner Shadow" },
    { type: "outer", label: "Outer Shadow" },
  ];

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleSave = () => {
    onCustomize({
      shapeColor: backgroundColor,
      borderRadius,
      shadowType,
      strokeWidth,
      isFilled,
    });
    onClose();
  };

  const renderPreview = () => {
    const baseStyle = {
      width: 100,
      height: 100,
      backgroundColor: isFilled ? backgroundColor : "transparent",
      borderWidth: !isFilled ? strokeWidth : 0,
      borderColor: !isFilled ? backgroundColor : "transparent",
      alignSelf: "center",
      marginBottom: 20,
      ...(shadowType === "outer" && styles.outerShadow),
      ...(shadowType === "inner" && styles.innerShadow),
    };

    const getShapeStyle = () => {
      switch (shapeType) {
        case "circle":
          return { borderRadius: 75 };
        case "triangle":
          return {
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 75,
            borderRightWidth: 75,
            borderBottomWidth: 150,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: backgroundColor,
          };
        case "pentagon":
          return {
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            borderRadius: borderRadius,
          };
        case "hexagon":
          return {
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            borderRadius: borderRadius,
          };
        case "star":
          return {
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            borderRadius: borderRadius,
          };
        case "square":
        default:
          return { borderRadius: borderRadius };
      }
    };

    return (
      <View style={styles.previewContainer}>
        <View style={[baseStyle, getShapeStyle()]} />
      </View>
    );
  };

  const renderBorderRadiusControl = () => {
    // Only show border radius for shapes that make sense
    const shapesWithBorderRadius = ["square", "pentagon", "hexagon", "star"];

    if (!shapesWithBorderRadius.includes(shapeType)) {
      return null;
    }

    return (
      <View style={styles.optionSection}>
        <Text style={styles.optionLabel}>Border Radius: {borderRadius}</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={borderRadius}
          onValueChange={(value) => setBorderRadius(value)}
          minimumTrackTintColor="#1E3A8A"
          maximumTrackTintColor="#D1D5DB"
        />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.customizationModal}>
          {renderPreview()}

          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Fill Mode</Text>
            <View style={styles.fillModeContainer}>
              <Text>Stroke Only</Text>
              <Switch value={isFilled} onValueChange={setIsFilled} />
              <Text>Filled</Text>
            </View>
          </View>

          {!isFilled && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>
                Stroke Width: {strokeWidth}
              </Text>
              <Slider
                minimumValue={0.5}
                maximumValue={10}
                step={0.5}
                value={strokeWidth}
                onValueChange={setStrokeWidth}
                minimumTrackTintColor="#1E3A8A"
                maximumTrackTintColor="#D1D5DB"
              />
            </View>
          )}

          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Color</Text>
            <ColorPicker value={backgroundColor} onComplete={handleColorChange}>
              <Panel1 style={styles.colorPicker} />
              <HueSlider />
            </ColorPicker>
          </View>

          {/* Border Radius Slider (Conditionally Rendered) */}
          {renderBorderRadiusControl()}

          {/* Shadow Type Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Shadow Type</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shadowTypeContainer}
            >
              {shadowOptions.map((option) => (
                <TouchableOpacity
                  key={option.type}
                  style={[
                    styles.shadowTypeButton,
                    shadowType === option.type && styles.selectedShadowType,
                  ]}
                  onPress={() => setShadowType(option.type)}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Modal Buttons */}
          <View style={styles.editModalButtons}>
            <TouchableOpacity style={styles.editModalCancel} onPress={onClose}>
              <Text style={styles.editModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editModalDone} onPress={handleSave}>
              <Text style={styles.editModalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fillModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  customizationModal: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  optionSection: {
    marginBottom: 10,
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1E3A8A",
  },
  colorPicker: {
    width: "100%",
    height: 200,
    marginBottom: 5,
  },
  shadowTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadowTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginRight: 10,
  },
  selectedShadowType: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  editModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editModalCancel: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
  },
  editModalDone: {
    flex: 1,
    padding: 12,
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    alignItems: "center",
  },
  editModalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  outerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});

export default ShapeCustomizationModal;
