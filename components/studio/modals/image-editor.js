import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import {
  Canvas,
  Image,
  Blur,
  ColorMatrix,
  DisplacementMap,
  BackdropFilter,
  useImage,
} from "@shopify/react-native-skia";
import { useStudio } from "../context";
import { ScreenSheet } from "./screenSheets";
import Slider from "@react-native-community/slider";

const LoadingSkeleton = () => {
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ]}
    />
  );
};

// Predefined color matrix filters
const COLOR_FILTERS = {
  normal: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  blackAndWhite: [
    0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0,
    0, 0, 1, 0,
  ],
  sepia: [
    0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131,
    0, 0, 0, 0, 0, 1, 0,
  ],
  invert: [-1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, 1, 0],
};

export const ImageEditSheet = ({ visible, onClose, elementId }) => {
  const { state, dispatch } = useStudio();
  const element = state.elements.find((el) => el.id === elementId);

  const [editSettings, setEditSettings] = useState({
    blur: 0,
    opacity: element?.opacity || 1,
    colorFilter: "normal",
    fit: element?.fit || "cover",
  });

  const handleSave = () => {
    updateElement(editSettings);
    onClose();
  };

  const [isLoading, setIsLoading] = useState(true);

  const updateElement = (updates) => {
    setIsLoading(true);
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: elementId,
        updates: {
          ...updates,
          filters: {
            blur: editSettings.blur,
            colorMatrix: COLOR_FILTERS[editSettings.colorFilter],
          },
          opacity: editSettings.opacity,
          fit: editSettings.fit,
        },
      },
    });
  };

  const PreviewCanvas = () => {
    const image = useImage(element?.url);

    useEffect(() => {
      if (image) {
        setIsLoading(false);
      }
    }, [image]);

    if (!image) return <LoadingSkeleton />;

    return (
      <Canvas style={styles.preview}>
        <Image
          image={image}
          x={0}
          y={0}
          width={200}
          height={200}
          fit={editSettings.fit}
          opacity={editSettings.opacity}
        >
          {editSettings.blur > 0 && <Blur blur={editSettings.blur} />}
          {editSettings.colorFilter !== "normal" && (
            <ColorMatrix matrix={COLOR_FILTERS[editSettings.colorFilter]} />
          )}
        </Image>
      </Canvas>
    );
  };

  if (!element) return null;

  return (
    <ScreenSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Edit Image</Text>

      <View style={styles.previewContainer}>
        <PreviewCanvas />
      </View>

      <ScrollView style={styles.controls}>
        {/* Blur Control */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>Blur</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            value={editSettings.blur}
            onValueChange={(value) =>
              setEditSettings((prev) => ({
                ...prev,
                blur: value,
              }))
            }
          />
        </View>

        {/* Opacity Control */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>Opacity</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={editSettings.opacity}
            onValueChange={(value) =>
              setEditSettings((prev) => ({
                ...prev,
                opacity: value,
              }))
            }
          />
        </View>

        {/* Color Filter Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>Color Filter</Text>
          <View style={styles.filterButtons}>
            {Object.keys(COLOR_FILTERS).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  editSettings.colorFilter === filter &&
                    styles.filterButtonActive,
                ]}
                onPress={() =>
                  setEditSettings((prev) => ({
                    ...prev,
                    colorFilter: filter,
                  }))
                }
              >
                <Text style={styles.filterButtonText}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fit Mode Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>Fit Mode</Text>
          <View style={styles.filterButtons}>
            {["cover", "contain", "fill"].map((fit) => (
              <TouchableOpacity
                key={fit}
                style={[
                  styles.filterButton,
                  editSettings.fit === fit && styles.filterButtonActive,
                ]}
                onPress={() =>
                  setEditSettings((prev) => ({
                    ...prev,
                    fit,
                  }))
                }
              >
                <Text style={styles.filterButtonText}>
                  {fit.charAt(0).toUpperCase() + fit.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScreenSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1e3a8a",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 16,
    height: 200,
  },
  preview: {
    width: 200,
    height: 200,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  controls: {
    maxHeight: 300,
  },
  controlGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1e3a8a",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  filterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: "#1e3a8a",
  },
  filterButtonText: {
    color: "#1e3a8a",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#1e3a8a",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
