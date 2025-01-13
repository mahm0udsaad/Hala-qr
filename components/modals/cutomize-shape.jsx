import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Switch,
} from "react-native";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import Slider from "@react-native-community/slider";
import {
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Star,
  Heart,
  Diamond,
  Octagon,
} from "./../icons";
import { CircleIcon } from "lucide-react-native";
const { width } = Dimensions.get("window");

const ShapeCustomizationModal = ({
  visible,
  onClose,
  shapeType,
  currentColor,
  currentStrokeWidth,
  currentFilled,
  onCustomize,
}) => {
  const [backgroundColor, setBackgroundColor] = useState(currentColor);
  const [strokeWidth, setStrokeWidth] = useState(currentStrokeWidth);
  const [isFilled, setIsFilled] = useState(currentFilled);

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleSave = () => {
    onCustomize({
      shapeColor: backgroundColor,
      strokeWidth,
      isFilled,
    });
    onClose();
  };

  const renderPreview = () => {
    const props = {
      color: currentColor,
      strokeWidth: strokeWidth,
      fill: isFilled,
    };

    const shapes = {
      square: Square,
      circle: Circle,
      triangle: Triangle,
      pentagon: Pentagon,
      hexagon: Hexagon,
      star: Star,
      heart: Heart,
      diamond: Diamond,
      octagon: Octagon,
    };

    const ShapeComponent = shapes[shapeType] || Square;
    return (
      <View style={styles.previewContainer}>
        <ShapeComponent {...props} />
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <Text>Outlined</Text>
                <CircleIcon stroke={"#1E3A8A"} size={20} />
              </View>
              <Switch value={isFilled} onValueChange={setIsFilled} />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text>Filled</Text>
                <CircleIcon fill={"#1E3A8A"} size={20} />
              </View>
            </View>
          </View>

          {!isFilled && (
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>
                Stroke Width: {strokeWidth}
              </Text>
              <Slider
                minimumValue={1}
                maximumValue={10}
                step={1}
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
