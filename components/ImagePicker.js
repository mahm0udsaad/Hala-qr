import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export function ImagePickerComp({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleImagePick = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onSelect(result.uri, type);
      setIsOpen(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.button}>
        <Feather name="image" size={24} color="#FFD700" />
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => handleImagePick("background")}
              style={styles.option}
            >
              <Text style={styles.optionText}>Set as Background</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleImagePick("element")}
              style={styles.option}
            >
              <Text style={styles.optionText}>Add as Element</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
