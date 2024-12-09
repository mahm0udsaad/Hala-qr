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
}) => {
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const [showControls, setShowControls] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const handleToggleControls = useCallback(() => {
    setShowControls((prev) => !prev);
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
      },
    }),
  ).current;

  const animatedStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  const truncatedText = text.length > 30 ? text.substring(0, 30) + "..." : text;

  return (
    <>
      <Animated.View
        style={[styles.textContainer, animatedStyle]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={handleToggleControls}
          style={[styles.textWrapper, { backgroundColor }]}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize,
                fontWeight,
                fontFamily: fontFamily === "system" ? undefined : fontFamily,
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
        onRequestClose={() => setShowMoreOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.moreOptionsModal}>
            {/* Preview Header */}
            <View style={styles.previewContainer}>
              <Text
                style={[
                  styles.previewText,
                  {
                    color: textColor,
                    backgroundColor,
                    fontSize,
                    fontWeight,
                    fontFamily:
                      fontFamily === "system" ? undefined : fontFamily,
                  },
                ]}
              >
                {truncatedText}
              </Text>
            </View>

            {/* Text Color Picker */}
            <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
              <View style={styles.colorOptionSection}>
                <Text style={styles.optionLabel}>Text Color</Text>
                <ColorPicker
                  value={textColor}
                  onComplete={(color) =>
                    onColorChange({
                      textColor: color.hex,
                    })
                  }
                >
                  <Panel1 style={styles.colorPicker} />
                  <HueSlider />
                </ColorPicker>
              </View>

              {/* Background Color Picker */}
              <View style={styles.colorOptionSection}>
                <Text style={styles.optionLabel}>Background Color</Text>
                <ColorPicker
                  value={backgroundColor}
                  onComplete={(color) =>
                    onColorChange({
                      backgroundColor: color.hex,
                    })
                  }
                >
                  <Panel1 style={styles.colorPicker} />
                  <HueSlider />
                </ColorPicker>
              </View>
            </View>

            {/* Font Size Slider */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>
                Font Size: {fontSize.toFixed(0)}
              </Text>
              <Slider
                minimumValue={12}
                maximumValue={36}
                step={1}
                value={fontSize}
                onValueChange={(value) => onStyleChange({ fontSize: value })}
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
                      fontWeight === option.weight && styles.selectedFontWeight,
                    ]}
                    onPress={() => onStyleChange({ fontWeight: option.weight })}
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
                      fontFamily === option.font && styles.selectedFontWeight,
                    ]}
                    onPress={() => onStyleChange({ fontFamily: option.font })}
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
                onPress={() => setShowMoreOptions(false)}
              >
                <Text style={styles.editModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editModalDone}
                onPress={() => setShowMoreOptions(false)}
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
    backgroundColor: "rgba(30, 58, 138, 0.1)",
    padding: 8,
    borderRadius: 8,
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
