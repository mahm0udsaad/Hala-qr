import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const fontWeightOptions = [
  { label: "Light", wight: "300" },
  { label: "Regular", wight: "400" },
  { label: "Medium", wight: "500" },
  { label: "Bold", wight: "700" },
  { label: "Extra Bold", wight: "900" },
];

const CustomizeTextModal = ({
  textStyle,
  setTextStyle,
  onCancel,
  onConfirm,
  previewText,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.customizeModal}>
        <ScrollView>
          <View style={styles.previewContainer}>
            <Text style={[styles.previewText, textStyle]}>{previewText}</Text>
          </View>

          {/* Font Size Slider */}
          <View style={styles.sliderContainer}>
            <Text>Font Size: {textStyle.fontSize.toFixed(0)}</Text>
            <View style={styles.slider}>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() =>
                  setTextStyle((prev) => ({
                    ...prev,
                    fontSize: Math.max(8, prev.fontSize - 1),
                  }))
                }
              >
                <Text style={{ fontSize: 20 }}>-</Text>
              </TouchableOpacity>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderThumb,
                    {
                      left: `${((textStyle.fontSize - 8) / (48 - 8)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={styles.sliderButton}
                onPress={() =>
                  setTextStyle((prev) => ({
                    ...prev,
                    fontSize: Math.min(48, prev.fontSize + 1),
                  }))
                }
              >
                <Text style={{ fontSize: 20 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Font Weight */}
          <View style={styles.optionContainer}>
            <Text>Font Weight</Text>
            <View style={styles.optionButtons}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.fontWeightContainer}
              >
                {fontWeightOptions.map((option) => (
                  <TouchableOpacity
                    key={option.wight}
                    style={[
                      styles.fontWeightButton,
                      textStyle.fontWeight === option.wight &&
                        styles.selectedFontWeight,
                    ]}
                    onPress={() =>
                      setTextStyle((prev) => ({
                        ...prev,
                        fontWeight: option.wight,
                      }))
                    }
                  >
                    <Text style={{ fontWeight: option.wight }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Font Style */}
          <View style={styles.optionContainer}>
            <Text>Font Style</Text>
            <View style={styles.optionButtons}>
              {["normal", "italic"].map((style) => (
                <TouchableOpacity
                  key={style}
                  style={[
                    styles.optionButton,
                    textStyle.fontStyle === style && styles.optionButtonActive,
                  ]}
                  onPress={() =>
                    setTextStyle((prev) => ({
                      ...prev,
                      fontStyle: style,
                    }))
                  }
                >
                  <Text style={{ fontStyle: style }}>{style}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.editModalButtons}>
            <TouchableOpacity style={styles.editModalCancel} onPress={onCancel}>
              <Text style={styles.editModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editModalDone} onPress={onConfirm}>
              <Text style={styles.editModalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  customizeModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  previewContainer: {
    padding: 16,
    alignItems: "center",
  },
  previewText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  sliderButton: {
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  sliderTrack: {
    width: "80%",
    height: 4,
    backgroundColor: "#1E3A8A",
    marginHorizontal: 8,
    position: "relative",
  },
  sliderThumb: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1E3A8A",
    top: -6,
  },
  optionContainer: {
    marginBottom: 16,
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  fontWeightButton: {
    padding: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  selectedFontWeight: {
    backgroundColor: "#1E3A8A",
  },
  editModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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
});

export default CustomizeTextModal;
