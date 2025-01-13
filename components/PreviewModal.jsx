import { Canvas, Image } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.9;

const PreviewModal = ({ visible, onClose, onSave, capturedImage }) => {
  const PreviewComponent = () => {
    if (!capturedImage) return null;

    return (
      <Canvas style={{ flex: 1 }}>
        <Image
          image={capturedImage}
          fit="contain"
          x={0}
          y={0}
          width={400}
          height={400}
        />
      </Canvas>
    );
  };
  const translateY = useSharedValue(SHEET_HEIGHT);
  const [isSaving, setIsSaving] = React.useState(false);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.2, 0.65, 0.5, 0.9),
      });
    } else {
      translateY.value = withTiming(
        SHEET_HEIGHT,
        {
          duration: 200,
          easing: Easing.bezier(0.4, 0, 1, 1),
        },
        () => {
          runOnJS(onClose)();
        },
      );
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  return (
    <>
      {visible && (
        <View style={styles.overlay}>
          <Animated.View style={[styles.sheet, sheetStyle]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => runOnJS(onClose)()}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Preview</Text>
            </View>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {capturedImage && (
                <View
                  style={[
                    styles.previewContainer,
                    {
                      width: 400,
                      height: 500,
                    },
                  ]}
                >
                  {/* Replace this with your image rendering */}
                  <PreviewComponent />
                </View>
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    isSaving && styles.saveButtonDisabled,
                  ]}
                  onPress={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  disabled={isSaving}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    position: "absolute",
    top: SCREEN_HEIGHT - SHEET_HEIGHT,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    padding: 8,
    position: "absolute",
    right: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  previewContainer: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  saveButtonDisabled: {
    backgroundColor: "#94A3B8",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
});

export default PreviewModal;
