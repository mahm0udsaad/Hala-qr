import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import { FontPicker } from "./font-picker";
import { EffectsControls } from "./effects-controls";
import { ColorPicker } from "./color-picker";

export function OptionsSheet({
  isOpen,
  onClose,
  activeElement,
  updateElement,
}) {
  if (!isOpen || !activeElement) return null;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit {activeElement.type}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>

        {activeElement.type === "text" && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font</Text>
              <FontPicker
                onSelect={(font) =>
                  updateElement(activeElement.id, { fontFamily: font })
                }
                currentFont={activeElement.fontFamily}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Font Size</Text>
              <Slider
                value={activeElement.fontSize}
                onValueChange={(value) =>
                  updateElement(activeElement.id, { fontSize: value })
                }
                minimumValue={8}
                maximumValue={72}
                step={1}
              />
              <Text style={styles.sliderValue}>{activeElement.fontSize}px</Text>
            </View>
          </>
        )}

        {activeElement.type === "image" && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Opacity</Text>
              <Slider
                value={activeElement.opacity || 1}
                onValueChange={(value) =>
                  updateElement(activeElement.id, { opacity: value })
                }
                minimumValue={0}
                maximumValue={1}
                step={0.01}
              />
              <Text style={styles.sliderValue}>
                {Math.round((activeElement.opacity || 1) * 100)}%
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Grayscale</Text>
              <Switch
                value={activeElement.grayscale || false}
                onValueChange={(value) =>
                  updateElement(activeElement.id, { grayscale: value })
                }
              />
            </View>
          </>
        )}

        <EffectsControls
          type={activeElement.type}
          effects={
            activeElement.type === "text"
              ? activeElement.textEffect || {}
              : activeElement.shapeEffect || {}
          }
          onChange={(effects) =>
            updateElement(activeElement.id, {
              [activeElement.type === "text" ? "textEffect" : "shapeEffect"]:
                effects,
            })
          }
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <ColorPicker
            color={activeElement.color}
            onColorChange={(color) =>
              updateElement(activeElement.id, { color: color })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  scrollView: {
    maxHeight: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sliderValue: {
    textAlign: "center",
    marginTop: 5,
  },
});
