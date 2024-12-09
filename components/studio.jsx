import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ColorPicker, { HueSlider, Panel1 } from "reanimated-color-picker";
import { TextCursor, Palette, Shapes } from "lucide-react-native";
import TextElement from "./text-element";
import ShapeElement from "./shape-element";

const TextCanvasScreen = () => {
  const [textElements, setTextElements] = useState([]);
  const [shapeElements, setShapeElements] = useState([]);
  const [editingText, setEditingText] = useState(null);
  const [tempEditText, setTempEditText] = useState("");
  const [canvasBackground, setCanvasBackground] = useState("white");
  const [showBackgroundColorModal, setShowBackgroundColorModal] =
    useState(false);
  const [showShapeModal, setShowShapeModal] = useState(false);
  const [selectedShapeType, setSelectedShapeType] = useState(null);
  const [shapeColor, setShapeColor] = useState("#1E3A8A");

  const addNewText = () => {
    const newText = {
      id: Date.now(),
      content: "New Text",
      textColor: "#000000",
      backgroundColor: "rgba(30, 58, 138, 0.1)",
      fontSize: 16,
      fontWeight: "400",
      fontFamily: "system",
    };
    setTextElements([...textElements, newText]);
  };

  const deleteText = (id) => {
    setTextElements(textElements.filter((text) => text.id !== id));
  };

  const startEditing = (id) => {
    const textToEdit = textElements.find((t) => t.id === id);
    setTempEditText(textToEdit.content);
    setEditingText(id);
  };

  const confirmEdit = () => {
    setTextElements(
      textElements.map((text) =>
        text.id === editingText ? { ...text, content: tempEditText } : text,
      ),
    );
    setEditingText(null);
    setTempEditText("");
  };

  const handleColorChange = (id, colors) => {
    setTextElements(
      textElements.map((text) =>
        text.id === id
          ? {
              ...text,
              ...(colors.textColor && { textColor: colors.textColor }),
              ...(colors.backgroundColor && {
                backgroundColor: colors.backgroundColor,
              }),
            }
          : text,
      ),
    );
  };

  const handleStyleChange = (id, styles) => {
    setTextElements(
      textElements.map((text) =>
        text.id === id
          ? {
              ...text,
              ...(styles.fontSize && { fontSize: styles.fontSize }),
              ...(styles.fontWeight && { fontWeight: styles.fontWeight }),
              ...(styles.fontFamily && { fontFamily: styles.fontFamily }),
            }
          : text,
      ),
    );
  };

  const handleCanvasBackgroundChange = (color) => {
    setCanvasBackground(color.hex);
  };
  const addNewShape = () => {
    if (selectedShapeType) {
      const newShape = {
        id: Date.now(),
        type: selectedShapeType,
        color: shapeColor,
      };
      setShapeElements([...shapeElements, newShape]);
      setShowShapeModal(false);
      setSelectedShapeType(null);
    }
  };
  const deleteShape = (id) => {
    setShapeElements(shapeElements.filter((shape) => shape.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Canvas */}
      <View style={[styles.canvas, { backgroundColor: canvasBackground }]}>
        {textElements.map((textEl) => (
          <TextElement
            key={textEl.id}
            text={textEl.content}
            textColor={textEl.textColor}
            backgroundColor={textEl.backgroundColor}
            fontSize={textEl.fontSize}
            fontWeight={textEl.fontWeight}
            fontFamily={textEl.fontFamily}
            onDelete={() => deleteText(textEl.id)}
            onEdit={() => startEditing(textEl.id)}
            onColorChange={(colors) => handleColorChange(textEl.id, colors)}
            onStyleChange={(styles) => handleStyleChange(textEl.id, styles)}
          />
        ))}
        {shapeElements.map((shapeEl) => (
          <ShapeElement
            key={shapeEl.id}
            type={shapeEl.type}
            shapeColor={shapeEl.color}
            initialSize={shapeEl.size}
            onDelete={() => deleteShape(shapeEl.id)}
          />
        ))}
      </View>

      {/* Bottom Toolbar */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.addTextButton} onPress={addNewText}>
          <TextCursor style={styles.addTextButtonText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backgroundColorButton}
          onPress={() => setShowBackgroundColorModal(true)}
        >
          <Palette style={styles.backgroundColorButtonText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backgroundColorButton}
          onPress={() => setShowShapeModal(true)}
        >
          <Shapes style={styles.backgroundColorButtonText} />
        </TouchableOpacity>
      </View>

      {/* Shape Selection Modal */}
      <Modal
        visible={showShapeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowShapeModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.shapeModal}>
            <Text style={styles.backgroundColorTitle}>Select Shape</Text>

            {/* Shape Selection */}
            <ScrollView
              horizontal
              contentContainerStyle={styles.shapeContainer}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={[
                  styles.shapeButton,
                  selectedShapeType === "square" && styles.selectedShape,
                ]}
                onPress={() => setSelectedShapeType("square")}
              >
                <View style={styles.squareShape} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.shapeButton,
                  selectedShapeType === "circle" && styles.selectedShape,
                ]}
                onPress={() => setSelectedShapeType("circle")}
              >
                <View style={styles.circleShape} />
              </TouchableOpacity>
            </ScrollView>

            {/* Modal Buttons */}
            <View style={styles.editModalButtons}>
              <TouchableOpacity
                style={styles.editModalCancel}
                onPress={() => {
                  setShowShapeModal(false);
                  setSelectedShapeType(null);
                }}
              >
                <Text style={styles.editModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editModalDone}
                onPress={addNewShape}
                disabled={!selectedShapeType}
              >
                <Text style={styles.editModalButtonText}>Add Shape</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Background Color Modal */}
      <Modal
        visible={showBackgroundColorModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBackgroundColorModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.backgroundColorModal}>
            <Text style={styles.backgroundColorTitle}>
              Select Canvas Background
            </Text>

            {/* Color Picker */}
            <ColorPicker
              value={canvasBackground}
              onComplete={handleCanvasBackgroundChange}
            >
              <Panel1 style={styles.colorPicker} />
              <HueSlider />
            </ColorPicker>

            {/* Modal Buttons */}
            <View style={styles.editModalButtons}>
              <TouchableOpacity
                style={styles.editModalCancel}
                onPress={() => setShowBackgroundColorModal(false)}
              >
                <Text style={styles.editModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editModalDone}
                onPress={() => setShowBackgroundColorModal(false)}
              >
                <Text style={styles.editModalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Text Modal */}
      <Modal
        visible={editingText !== null}
        transparent={true}
        animationType="slide"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.editModal}>
            <TextInput
              style={styles.editInput}
              value={tempEditText}
              onChangeText={setTempEditText}
              autoFocus
              multiline
              placeholder="Edit text"
            />
            <View style={styles.editModalButtons}>
              <TouchableOpacity
                style={styles.editModalCancel}
                onPress={() => {
                  setEditingText(null);
                  setTempEditText("");
                }}
              >
                <Text style={styles.editModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editModalDone}
                onPress={confirmEdit}
              >
                <Text style={styles.editModalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    height: "80%",
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
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
  backgroundColorButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backgroundColorButtonText: {
    color: "#FDE047",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backgroundColorModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backgroundColorTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  colorPicker: {
    width: "100%",
    height: 200,
    marginBottom: 16,
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
    marginTop: 16,
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
  shapeModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  shapeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  shapeButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  selectedShape: {
    borderColor: "#1E3A8A",
    backgroundColor: "rgba(30, 58, 138, 0.1)",
  },
  squareShape: {
    width: 80,
    height: 80,
    backgroundColor: "#1E3A8A",
    marginBottom: 8,
    borderRadius: 8,
  },
  circleShape: {
    width: 80,
    height: 80,
    backgroundColor: "#1E3A8A",
    marginBottom: 8,
    borderRadius: 40,
  },
  colorOptionSection: {
    width: "100%",
    marginBottom: 20,
  },
  colorPicker: {
    width: "100%",
    height: 100,
    marginBottom: 16,
  },
});

export default TextCanvasScreen;
