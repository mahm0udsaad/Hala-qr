// EditTextModal.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useStudio } from "../../context";

const EditTextModal = ({ visible, onClose, elementId, initialText }) => {
  const { updateText } = useStudio();
  const [editingText, setEditingText] = React.useState(initialText);

  const handleConfirm = () => {
    updateText(elementId, { content: editingText });
    onClose();
  };

  React.useEffect(() => {
    setEditingText(initialText);
  }, [initialText]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.editModal}>
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={setEditingText}
            autoFocus
            multiline
            placeholder="Edit text"
          />
          <View style={styles.editModalButtons}>
            <TouchableOpacity style={styles.editModalCancel} onPress={onClose}>
              <Text style={styles.editModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editModalDone}
              onPress={handleConfirm}
            >
              <Text style={styles.editModalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default EditTextModal;
