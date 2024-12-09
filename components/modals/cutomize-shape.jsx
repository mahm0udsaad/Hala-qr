import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
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
  onCustomize,
}) => {
  const [backgroundColor, setBackgroundColor] = useState(currentColor);
  const [borderRadius, setBorderRadius] = useState(currentRadius);
  const [shadowType, setShadowType] = useState(currentShadow);

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
    });
    onClose();
  };

  const renderPreview = () => {
    const previewStyle = {
      width: 150,
      height: 150,
      backgroundColor,
      borderRadius: borderRadius,
      alignSelf: "center",
      marginBottom: 20,
      ...(shadowType === "outer" && styles.outerShadow),
      ...(shadowType === "inner" && styles.innerShadow),
    };

    return (
      <View style={styles.previewContainer}>
        <View style={previewStyle} />
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
          {/* Preview */}
          {renderPreview()}

          {/* Background Color Picker */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Background Color</Text>
            <ColorPicker value={backgroundColor} onComplete={handleColorChange}>
              <Panel1 style={styles.colorPicker} />
              <HueSlider />
            </ColorPicker>
          </View>

          {/* Border Radius Slider */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>
              Border Radius: {borderRadius.toFixed(0)}
            </Text>
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
    marginBottom: 20,
  },
  optionSection: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1E3A8A",
  },
  colorPicker: {
    width: "100%",
    height: 200,
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
