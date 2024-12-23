import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Modal,
  ScrollView,
} from "react-native";
import { Trash2, Edit2, EllipsisVertical } from "lucide-react-native";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";
import Slider from "@react-native-community/slider";
import { useStudio } from "../context";

const { width, height } = Dimensions.get("window");

const fontWeightOptions = [
  { label: "Light", weight: "300" },
  { label: "Regular", weight: "400" },
  { label: "Medium", weight: "500" },
  { label: "Bold", weight: "700" },
  { label: "Extra Bold", weight: "900" },
];

const fontFamilyOptions = [
  { label: "Default", font: "system" },
  { label: "Serif", font: "serif" },
  { label: "Monospace", font: "monospace" },
  { label: "Sans Serif", font: "sans-serif" },
  { label: "Roboto", font: "Roboto" },
  { label: "Open Sans", font: "OpenSans" },
  { label: "Lato", font: "Lato" },
  { label: "Nunito", font: "Nunito" },
  { label: "Courier", font: "Courier" },
];

const TextElement = ({
  text,
  onDelete,
  onEdit,
  initialX = width / 2,
  initialY = height / 2,
  textColor = "#000000",
  backgroundColor = "rgba(30, 58, 138, 0.1)",
  fontSize = 16,
  fontWeight = "400",
  fontFamily = "system",
  onColorChange,
  onStyleChange,
  showControls,
  id,
}) => {
  const { toggleElementControls, updateElementPosition } = useStudio();

  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Store temporary style changes
  const [tempStyles, setTempStyles] = useState({
    textColor,
    backgroundColor,
    fontSize,
    fontWeight,
    fontFamily,
  });

  const handleToggleControls = useCallback(() => {
    toggleElementControls("text", id);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        // Calculate new position and update in context
        const newX = pan.x._value;
        const newY = pan.y._value;
        updateElementPosition("text", id, newX, newY);
      },
    }),
  ).current;

  const animatedStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  const truncatedText = text.length > 30 ? text.substring(0, 30) + "..." : text;

  const handleStyleChange = (newStyle) => {
    // Update temporary styles
    setTempStyles((prev) => ({
      ...prev,
      ...newStyle,
    }));
  };

  const handleDone = () => {
    // Apply all temporary styles at once when "Done" is pressed
    onStyleChange(tempStyles);
    setShowMoreOptions(false);
  };

  const handleCancel = () => {
    // Reset temporary styles to original values
    setTempStyles({
      textColor,
      backgroundColor,
      fontSize,
      fontWeight,
      fontFamily,
    });
    setShowMoreOptions(false);
  };

  return (
    <>
      <Animated.View
        style={[styles.textContainer, animatedStyle]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={handleToggleControls}
          style={styles.textWrapper}
        >
          <Text
            style={[
              styles.text,
              {
                color: tempStyles.textColor,
                fontSize: tempStyles.fontSize,
                fontWeight: tempStyles.fontWeight,
                fontFamily:
                  tempStyles.fontFamily === "system"
                    ? undefined
                    : tempStyles.fontFamily,
              },
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>

        {showControls && (
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setShowMoreOptions(true)}
            >
              <EllipsisVertical size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Edit2 size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Trash2 size={18} color="#FF0000" />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      <Modal
        visible={showMoreOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.moreOptionsModal}>
            {/* Preview Header */}
            <View style={styles.previewContainer}>
              <Text
                style={[
                  styles.previewText,
                  {
                    color: tempStyles.textColor,
                    backgroundColor: tempStyles.backgroundColor,
                    fontSize: tempStyles.fontSize,
                    fontWeight: tempStyles.fontWeight,
                    fontFamily:
                      tempStyles.fontFamily === "system"
                        ? undefined
                        : tempStyles.fontFamily,
                  },
                ]}
              >
                {truncatedText}
              </Text>
            </View>

            {/* Text Color Picker */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Text Color</Text>
              <ColorPicker
                value={tempStyles.textColor}
                onComplete={(color) => {
                  handleStyleChange({ textColor: color.hex });
                }}
              >
                <Panel1 style={styles.colorPicker} />
                <HueSlider />
              </ColorPicker>
            </View>

            {/* Font Size Slider */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>
                Font Size: {tempStyles.fontSize.toFixed(0)}
              </Text>
              <Slider
                minimumValue={12}
                maximumValue={36}
                step={3}
                value={tempStyles.fontSize}
                onValueChange={(value) =>
                  handleStyleChange({ fontSize: value })
                }
                minimumTrackTintColor="#1E3A8A"
                maximumTrackTintColor="#D1D5DB"
              />
            </View>

            {/* Font Weight Selection */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Font Weight</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.fontWeightContainer}
              >
                {fontWeightOptions.map((option) => (
                  <TouchableOpacity
                    key={option.weight}
                    style={[
                      styles.fontWeightButton,
                      tempStyles.fontWeight === option.weight &&
                        styles.selectedFontWeight,
                    ]}
                    onPress={() =>
                      handleStyleChange({ fontWeight: option.weight })
                    }
                  >
                    <Text style={{ fontWeight: option.weight }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Font Family Selection */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Font Style</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.fontWeightContainer}
              >
                {fontFamilyOptions.map((option) => (
                  <TouchableOpacity
                    key={option.font}
                    style={[
                      styles.fontWeightButton,
                      tempStyles.fontFamily === option.font &&
                        styles.selectedFontWeight,
                    ]}
                    onPress={() =>
                      handleStyleChange({ fontFamily: option.font })
                    }
                  >
                    <Text style={{ fontFamily: option.font }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Modal Buttons */}
            <View style={styles.editModalButtons}>
              <TouchableOpacity
                style={styles.editModalCancel}
                onPress={handleCancel}
              >
                <Text style={styles.editModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editModalDone}
                onPress={handleDone}
              >
                <Text style={styles.editModalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E8FF",
  },
  canvas: {
    height: "80%",
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  textContainer: {
    position: "absolute",
    alignSelf: "flex-start",
    zIndex: 100,
  },
  textWrapper: {
    padding: 8,
  },
  text: {
    fontSize: 16,
  },
  separator: {
    marginHorizontal: 4,
    color: "#D1D5DB",
    fontSize: 20,
  },
  controlButtons: {
    flexDirection: "row",
    position: "absolute",
    top: -40,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
  toolbar: {
    padding: 16,
    alignItems: "center",
  },
  addTextButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addTextButtonText: {
    color: "#FDE047",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  editModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  editInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  editModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editModalCancel: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: "#E5E7EB",
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
    fontWeight: "600",
  },
  moreOptionsModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  moreOptionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  colorPicker: {
    width: "100%",
    height: 100,
    marginBottom: 16,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  previewText: {
    fontSize: 18,
    padding: 8,
    borderRadius: 8,
  },
  optionSection: {
    width: "100%",
    marginBottom: 20,
  },
  colorOptionSection: {
    width: "50%",
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  fontWeightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontWeightButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  selectedFontWeight: {
    backgroundColor: "#1E3A8A",
    color: "#FFFFFF",
  },
});

export default TextElement;
