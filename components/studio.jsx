import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
} from "react-native";
import {
  makeImageFromView,
  Canvas as SkiaCanvas,
  Image,
} from "@shopify/react-native-skia";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import {
  TextCursor,
  Palette,
  Shapes,
  Image as ImageIcon,
  ChevronLeft,
  Download,
} from "lucide-react-native";
import { useStudio } from "../context";
import BackgroundColorModal from "./modals/bg-modal";
import ShapeSelectionModal from "./modals/select-shape-modal";
import EditTextModal from "./modals/edit-text";
import ImageUploadModal from "./modals/image-upload";
import { NavigationContainer } from "@react-navigation/native";
import Canvas from "./canvas";
import PreviewModal from "./PreviewModal";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PREVIEW_PADDING = 32;
const PREVIEW_WIDTH = SCREEN_WIDTH - PREVIEW_PADDING * 2;

const TextCanvasScreen = () => {
  const {
    state,
    addText,
    deleteText,
    updateText,
    addShape,
    deleteShape,
    setCanvasBackground,
    setBackgroundImage,
    hideAllElementControls,
    setInvitationImage,
  } = useStudio();
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
  const [editingText, setEditingText] = useState(null);
  const [tempEditText, setTempEditText] = useState("");
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedShapeType, setSelectedShapeType] = useState(null);

  const captureCanvas = async () => {
    try {
      if (!canvasRef.current) {
        console.error("Canvas ref is null");
        return;
      }

      hideAllElementControls();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const snapshot = await makeImageFromView(canvasRef);
      console.log("Captured image dimensions:", {
        width: snapshot.width(),
        height: snapshot.height(),
      });

      const imageWidth = snapshot.width();
      const imageHeight = snapshot.height();
      const aspectRatio = imageHeight / imageWidth;

      const previewWidth = PREVIEW_WIDTH;
      const previewHeight = previewWidth * aspectRatio;

      setPreviewDimensions({
        width: previewWidth,
        height: previewHeight,
      });

      setCapturedImage(snapshot);
      setShowPreviewModal(true);
    } catch (error) {
      console.error("Error capturing canvas:", error);
    }
  };

  const saveToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted" && capturedImage) {
        const base64Data = await capturedImage.encodeToBase64();
        const filename = `invitation_design_${Date.now()}.png`;
        const fileUri = `${FileSystem.documentDirectory}${filename}`;

        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("invitation_design", asset, false);

        // Save image URL to context
        setInvitationImage(fileUri);

        // Clear states
        setCapturedImage(null);
        setShowPreviewModal(false);

        // Navigate to event details screen
        router.push("/add/templates/new/event-details");

        console.log("Image saved successfully and navigating to event details");
      }
    } catch (error) {
      console.error("Error saving to gallery:", error);
    }
  };

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData.data.url);
  };

  const setImageAsBackground = () => {
    if (uploadedImage) {
      setBackgroundImage(uploadedImage);
      setCanvasBackground("transparent");
      setUploadedImage(null);
    }
  };

  const handleAddNewText = () => {
    addText();
  };

  const handleDeleteText = (id) => {
    deleteText(id);
  };

  const startEditing = (id) => {
    const textToEdit = state.textElements.find((t) => t.id === id);
    setTempEditText(textToEdit.content);
    setEditingText(id);
  };

  const confirmEdit = () => {
    updateText(editingText, { content: tempEditText });
    setEditingText(null);
    setTempEditText("");
  };

  const handleColorChange = (id, colors) => {
    updateText(id, {
      textColor: colors.textColor,
      backgroundColor: colors.backgroundColor,
    });
  };

  const handleStyleChange = (id, styles) => {
    updateText(id, styles);
  };

  const handleCanvasBackgroundChange = (color) => {
    setCanvasBackground(color.hex);
  };

  const handleAddNewShape = () => {
    if (selectedShapeType) {
      addShape({
        type: selectedShapeType,
        color: "#1E3A8A",
        isFilled: true,
        strokeWidth: 1.5,
      });
      setShowShapeModal(false);
      setSelectedShapeType(null);
    }
  };

  const handleDeleteShape = (id) => {
    deleteShape(id);
  };

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        {/* Preview Modal */}
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => console.log("Go back")}
          >
            <ChevronLeft size={24} color="#FDE047" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customize</Text>
          <TouchableOpacity style={styles.exportButton} onPress={captureCanvas}>
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Canvas Area */}
        <View ref={canvasRef} collapsable={false} style={styles.captureArea}>
          <Canvas
            textElements={state.textElements}
            shapeElements={state.shapeElements}
            backgroundColor={state.canvasBackground}
            backgroundImage={state.backgroundImage}
            onDeleteText={handleDeleteText}
            onEditText={startEditing}
            onTextColorChange={handleColorChange}
            onTextStyleChange={handleStyleChange}
            onDeleteShape={handleDeleteShape}
            hideAllElementControls={hideAllElementControls}
          />
        </View>

        {/* Toolbar */}
        <View style={styles.toolbar}>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={handleAddNewText}
          >
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

        {/* Modals */}
        <BackgroundColorModal
          visible={showBackgroundColorModal}
          onClose={() => setShowBackgroundColorModal(false)}
          canvasBackground={state.canvasBackground}
          onColorChange={handleCanvasBackgroundChange}
        />

        <ShapeSelectionModal
          visible={showShapeModal}
          onClose={() => {
            setShowShapeModal(false);
            setSelectedShapeType(null);
          }}
          selectedShapeType={selectedShapeType}
          onSelectShape={setSelectedShapeType}
          onAddShape={handleAddNewShape}
        />

        <EditTextModal
          visible={editingText !== null}
          text={tempEditText}
          onChangeText={setTempEditText}
          onCancel={() => {
            setEditingText(null);
            setTempEditText("");
          }}
          onConfirm={confirmEdit}
        />

        <ImageUploadModal
          visible={showImageUploadModal}
          onClose={() => setShowImageUploadModal(false)}
          onUploadSuccess={handleImageUpload}
          uploadedImage={uploadedImage}
          onSetAsBackground={setImageAsBackground}
        />
      </View>
    </NavigationContainer>
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
    padding: 8,
    borderRadius: 8,
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
