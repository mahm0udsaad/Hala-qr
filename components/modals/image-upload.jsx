import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploadModal = ({
  visible,
  onClose,
  onUploadSuccess,
  uploadedImage,
  onSetAsBackground,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Open the image picker to select an image
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access images is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  // Upload the image to the server
  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage.uri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/image-upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const result = await response.json();
      onUploadSuccess(result);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.title}>Upload Image</Text>

          {/* Image Preview */}
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.imagePreview}
            />
          ) : uploadedImage ? (
            <Image
              source={{ uri: uploadedImage.url }}
              style={styles.imagePreview}
            />
          ) : (
            <Text style={styles.placeholder}>No image selected</Text>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={openImagePicker}
              disabled={uploading}
            >
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={uploadImage}
              disabled={uploading || !selectedImage}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Upload</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Set as Background Button */}
          {uploadedImage && (
            <TouchableOpacity
              style={styles.backgroundButton}
              onPress={onSetAsBackground}
            >
              <Text style={styles.buttonText}>Set as Background</Text>
            </TouchableOpacity>
          )}

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 16,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  placeholder: {
    marginVertical: 16,
    color: "gray",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  selectButton: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  uploadButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#E53E3E",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  backgroundButton: {
    marginTop: 12,
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});

export default ImageUploadModal;
