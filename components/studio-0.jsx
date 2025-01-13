import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { makeImageFromView } from "@shopify/react-native-skia";
import {
  TextCursor,
  Palette,
  Shapes,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react-native";
import { useStudio } from "../context";
import ImageUploadModal from "./modals/image-upload";
import Canvas from "./canvas";
import PreviewModal from "./PreviewModal";
import { useRouter } from "expo-router";
import ShapeSelectionModal from "./modals/select-shape-modal";
import BackgroundColorModal from "./modals/bg-modal";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PREVIEW_PADDING = 32;
const PREVIEW_WIDTH = SCREEN_WIDTH - PREVIEW_PADDING * 2;

const TextCanvasScreen = () => {
  const { addText, hideAllElementControls, setInvitationImage } = useStudio();
  const router = useRouter();
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDimensions, setPreviewDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showBackgroundColorModal, setShowBackgroundColorModal] =
    useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);

  const captureCanvas = async () => {
    try {
      if (!canvasRef.current) return;

      hideAllElementControls();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const snapshot = await makeImageFromView(canvasRef);
      const imageWidth = snapshot.width();
      const imageHeight = snapshot.height();
      const aspectRatio = imageHeight / imageWidth;

      const previewWidth = PREVIEW_WIDTH;
      const previewHeight = previewWidth * aspectRatio;

      setPreviewDimensions({ width: previewWidth, height: previewHeight });
      setCapturedImage(snapshot);
      setShowPreviewModal(true);
    } catch (error) {
      console.error("Error capturing canvas:", error);
    }
  };

  const saveToGallery = async () => {
    try {
      if (!capturedImage) return;

      const base64Data = await capturedImage.encodeToBase64();
      const imageData = `data:image/jpeg;base64,${base64Data}`;

      const formData = new FormData();
      formData.append("image", {
        uri: imageData,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/image-upload",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const { data } = await response.json();
      setInvitationImage(data.url);
      setCapturedImage(null);
      setShowPreviewModal(false);
      router.push("/add/templates/new/event-details");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddText = (e) => {
    e.persist?.(); // Handle both synthetic and native events
    const centerX = SCREEN_WIDTH / 2;
    const centerY = SCREEN_WIDTH / 2;

    addText({
      content: "New Text",
      x: centerX,
      y: centerY,
      textColor: "#000000",
      backgroundColor: "rgba(30, 58, 138, 0.1)",
      fontSize: 16,
      fontWeight: "400",
      fontFamily: "system",
    });
  };

  return (
    <View style={styles.container}>
      <PreviewModal
        visible={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setCapturedImage(null);
        }}
        onSave={saveToGallery}
        capturedImage={capturedImage}
        previewDimensions={previewDimensions}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FDE047" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize</Text>
        <TouchableOpacity style={styles.exportButton} onPress={captureCanvas}>
          <Text style={styles.exportButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View ref={canvasRef} collapsable={false} style={styles.captureArea}>
        <Canvas />
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleAddText}>
          <TextCursor size={24} color="#FDE047" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowBackgroundColorModal(true)}
        >
          <Palette size={24} color="#FDE047" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowShapeModal(true)}
        >
          <Shapes size={24} color="#FDE047" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowImageUploadModal(true)}
        >
          <ImageIcon size={24} color="#FDE047" />
        </TouchableOpacity>
      </View>

      <BackgroundColorModal
        visible={showBackgroundColorModal}
        onClose={() => setShowBackgroundColorModal(false)}
      />

      <ShapeSelectionModal
        visible={showShapeModal}
        onClose={() => setShowShapeModal(false)}
      />

      <ImageUploadModal
        visible={showImageUploadModal}
        onClose={() => setShowImageUploadModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E3A8A",
    padding: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#FDE047",
    fontSize: 20,
    fontWeight: "600",
  },
  exportButton: {
    backgroundColor: "#FDE047",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  exportButtonText: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
  captureArea: {
    flex: 1,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    padding: 16,
  },
  toolbarButton: {
    padding: 8,
  },
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

export default TextCanvasScreen;
