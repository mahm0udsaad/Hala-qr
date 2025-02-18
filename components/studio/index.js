import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Canvas,
  makeImageFromView,
  Image as SkiaImage,
  useImage,
} from "@shopify/react-native-skia";
import { TextInputSheet } from "./modals/TextInputSheet";
import { FiberProvider } from "its-fine";
import { Header } from "./components/header";
import { ToolBar } from "./components/toolbar";
import { StudioProvider, useStudio } from "./context";
import GestureHandler from "./components/gesture-handler";
import { ColorPickerSheet } from "./modals/color-picker";
import { ShapesSheet } from "./modals/shapes-sheet";
import { ImageUploadSheet } from "./modals/image-upload";
import { TextStyleSheet } from "./modals/text-modal";
import { CanvasElement } from "./elements";
import { ElementStyleSheet } from "./modals/element-options";
import { ImageEditSheet } from "./modals/image-editor";
import PreviewModal from "../PreviewModal";
import { useUser } from "../../context";
import { useRouter } from "expo-router";
import { uploadImage } from "../../helpers";

const PREVIEW_PADDING = 32;
const StudioContent = () => {
  const { state, dispatch } = useStudio();
  const { token } = useUser();
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);
  const [isShapesModalVisible, setIsShapesModalVisible] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isStyleSheetVisible, setIsStyleSheetVisible] = useState(false);
  const [isTextStyleModalVisible, setIsTextStyleModalVisible] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const transformsRef = useRef({});
  const [isImageEditSheetVisible, setIsImageEditSheetVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const router = useRouter();
  const canvasRef = useRef(null);

  // Load background image using Skia's useImage hook
  const backgroundImage = useImage(state.backgroundImage);

  const handleToolSelect = useCallback((toolId) => {
    switch (toolId) {
      case "text":
        setIsTextModalVisible(true);
        break;
      case "shapes":
        setIsShapesModalVisible(true);
        break;
      case "palette":
        setIsColorPickerVisible(true);
        break;
      case "image":
        setIsImageModalVisible(true);
        break;
    }
  }, []);

  const handleAddText = useCallback(
    (text) => {
      if (!text) return;

      // Calculate text width based on character count and average width
      const averageCharWidth = 16; // Adjust based on font and size
      const textWidth = text.length * averageCharWidth;
      const textHeight = 40; // Adjust based on font size

      if (isEditingText && editingElement) {
        // Handle text update
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: editingElement.id,
            updates: { text, size: { width: textWidth, height: textHeight } },
          },
        });
        setEditingElement(null);
        setIsEditingText(false);
      } else {
        // Handle new text addition
        const newElement = {
          id: `text-${Date.now()}`,
          type: "text",
          text,
          color: "black",
          size: { width: textWidth, height: textHeight },
          position: {
            x: Dimensions.get("window").width / 2,
            y: Dimensions.get("window").height / 3,
          },
        };

        dispatch({ type: "ADD_ELEMENT", payload: newElement });
      }
      setIsTextModalVisible(false);
    },
    [dispatch, isEditingText, editingElement],
  );
  const handleAddShape = useCallback(
    (newElement) => {
      dispatch({ type: "ADD_ELEMENT", payload: newElement });
    },
    [dispatch],
  );

  const handleColorChange = useCallback(
    (color) => {
      dispatch({ type: "UPDATE_CANVAS_BACKGROUND", payload: color });
    },
    [dispatch],
  );

  const handleGestureEnd = useCallback(
    (elementId, newPosition) => {
      dispatch({
        type: "UPDATE_POSITION",
        payload: { id: elementId, position: newPosition },
      });
    },
    [dispatch],
  );

  const handleTransformUpdate = async (elementId, transform) => {
    transformsRef.current[elementId] = transform;
  };

  // Update handleShowMoreOptions:
  const handleShowMoreOptions = (elementId) => {
    const element = state.elements.find((el) => el.id === elementId);
    if (element.type === "text") {
      setSelectedElementId(elementId);
      setIsTextStyleModalVisible(true);
    } else if (element.type === "image") {
      setSelectedElementId(elementId);
      setIsImageEditSheetVisible(true);
    } else {
      setSelectedElementId(elementId);
      setIsStyleSheetVisible(true);
    }
  };

  const handleEdit = (elementId) => {
    const element = state.elements.find((el) => el.id === elementId);
    if (element?.type === "text") {
      setEditingElement(element);
      setIsEditingText(true);
      setIsTextModalVisible(true);
    }
  };

  const handleDelete = (elementId) => {
    // Handle delete action
    dispatch({ type: "REMOVE_ELEMENT", payload: elementId });
  };
  const saveDesignToStore = async () => {
    console.log(state.designId);

    // Navigate to the /add/templates/[id]/event-details.jsx route
    router.push(`add/templates/${state.designId}/event-details`);
  };

  const handleSave = async () => {
    if (!canvasRef.current) {
      Alert.alert("Error", "Canvas reference is not available");
      return null;
    }

    try {
      // Capture snapshot
      const snapshot = await makeImageFromView(canvasRef);
      // Prepare form data with uploaded image filename
      const formData = new FormData();
      formData.append("category_id", "3");
      formData.append("image", state.backgroundImage.split("/")[4]);
      formData.append("title", `Design ${new Date().toLocaleDateString()}`);

      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/designs/store",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000, // 10-second timeout
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save design");
      }

      const data = await response.json();
      const designId = data?.data?.design?.id;
      console.log("Saved design ID:", designId);

      // Dispatch with additional error handling
      if (designId) {
        dispatch({ type: "SAVE_DESIGN_ID", payload: designId });
        setCapturedImage(snapshot);
        setIsPreviewModalVisible(true);
        return designId;
      }
    } catch (error) {
      console.error("Error saving design:", error);
      Alert.alert(
        "Save Error",
        error.message || "An unexpected error occurred",
      );
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onBack={() => {}} onSave={handleSave} />
      <View style={styles.canvasContainer}>
        <View
          ref={canvasRef}
          collapsable={false}
          style={[styles.paper, { backgroundColor: state.canvasBackground }]}
        >
          <Canvas style={styles.canvas}>
            {/* Render background image if available */}
            {backgroundImage && (
              <SkiaImage
                image={backgroundImage}
                x={0}
                y={0}
                width={Dimensions.get("window").width - 32}
                height={Dimensions.get("window").height - 150}
                fit="cover"
              />
            )}

            {state.elements?.map((element) => (
              <CanvasElement
                key={element.id}
                element={element}
                transform={transformsRef.current[element.id]}
              />
            ))}
          </Canvas>

          {state.elements?.map((element) => (
            <GestureHandler
              key={element.id}
              element={element}
              onGestureEnd={(position) =>
                handleGestureEnd(element.id, position)
              }
              onTransformUpdate={(transform) =>
                handleTransformUpdate(element.id, transform)
              }
              onShowMore={() => handleShowMoreOptions(element.id)}
              onEdit={() => handleEdit(element.id)}
              onDelete={() => handleDelete(element.id)}
            />
          ))}
        </View>
      </View>

      <ToolBar onToolSelect={handleToolSelect} />
      {/* Tool bar modals */}
      <TextInputSheet
        visible={isTextModalVisible}
        onClose={() => {
          setIsTextModalVisible(false);
          setIsEditingText(false);
          setEditingElement(null);
        }}
        onSubmit={handleAddText}
        initialText={editingElement?.text || ""}
        isEditing={isEditingText}
      />
      <ShapesSheet
        visible={isShapesModalVisible}
        onClose={() => setIsShapesModalVisible(false)}
        onSelectShape={handleAddShape}
      />
      <ColorPickerSheet
        visible={isColorPickerVisible}
        onClose={() => setIsColorPickerVisible(false)}
        onColorSelect={handleColorChange}
        initialColor={state.canvasBackground}
      />
      <ImageUploadSheet
        visible={isImageModalVisible}
        onClose={() => setIsImageModalVisible(false)}
      />
      {/* Edit on Elements Modal */}
      <TextStyleSheet
        visible={isTextStyleModalVisible}
        onClose={() => {
          setIsTextStyleModalVisible(false);
          setSelectedElementId(null);
        }}
        elementId={selectedElementId}
      />
      <ElementStyleSheet
        visible={isStyleSheetVisible}
        onClose={() => setIsStyleSheetVisible(false)}
        elementId={selectedElementId}
      />

      <ImageEditSheet
        visible={isImageEditSheetVisible}
        onClose={() => setIsImageEditSheetVisible(false)}
        elementId={selectedElementId}
      />
      <PreviewModal
        visible={isPreviewModalVisible}
        onClose={() => setIsPreviewModalVisible(false)}
        onSave={saveDesignToStore}
        capturedImage={capturedImage}
        previewDimensions={{
          width: Dimensions.get("window").width - 2 * PREVIEW_PADDING,
          height: Dimensions.get("window").height - 2 * PREVIEW_PADDING,
        }}
      />
    </SafeAreaView>
  );
};

export const InvitationStudio = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <FiberProvider>
        <StudioContent />
      </FiberProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#1e3a8a",
  },
  canvasContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  paper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  canvas: {
    overflow: "hidden",
    flex: 1,
  },
  hitArea: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
