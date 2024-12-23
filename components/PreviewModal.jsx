import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Canvas as SkiaCanvas, Image } from "@shopify/react-native-skia";
import { Download } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PREVIEW_PADDING = 32;
const PREVIEW_WIDTH = SCREEN_WIDTH - PREVIEW_PADDING * 2;

const PreviewModal = ({
  visible,
  onClose,
  onSave,
  capturedImage,
  previewDimensions,
}) => {
  const PreviewComponent = () => {
    if (!capturedImage) return null;

    return (
      <SkiaCanvas
        style={[
          styles.previewCanvas,
          {
            width: previewDimensions.width,
            height: previewDimensions.height,
          },
        ]}
      >
        <Image
          image={capturedImage}
          fit="contain"
          x={0}
          y={0}
          width={previewDimensions.width}
          height={previewDimensions.height}
        />
      </SkiaCanvas>
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Preview</Text>

          <View style={styles.previewContainer}>
            <PreviewComponent />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Download size={24} color="#1E3A8A" />
              <Text style={styles.saveButtonText}>Save to Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: PREVIEW_PADDING,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  previewContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 16,
  },
  previewCanvas: {
    backgroundColor: "white",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    gap: 8,
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#FDE047",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  saveButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
});

export default PreviewModal;
