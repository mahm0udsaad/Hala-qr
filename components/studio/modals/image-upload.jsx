import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageIcon } from "lucide-react-native";
import { BottomSheet } from "./index";
import { useStudio } from "../context";

// Add utility function to get image dimensions
const getImageDimensions = async (uri) => {
  return new Promise((resolve) => {
    Image.getSize(uri, (width, height) => {
      // Scale down large images while maintaining aspect ratio
      const maxDimension = 400;
      let scaledWidth = width;
      let scaledHeight = height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          scaledWidth = maxDimension;
          scaledHeight = (height / width) * maxDimension;
        } else {
          scaledHeight = maxDimension;
          scaledWidth = (width / height) * maxDimension;
        }
      }

      resolve({
        width: scaledWidth,
        height: scaledHeight,
        aspectRatio: width / height,
      });
    });
  });
};

export const ImageUploadSheet = ({ visible, onClose }) => {
  const { addImage, setBackgroundImage } = useStudio();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState(null);
  const [imageDimensions, setImageDimensions] = useState(null);

  const openImagePicker = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("Permission to access images is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const dimensions = await getImageDimensions(result.assets[0].uri);
      setImageDimensions(dimensions);
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage || !imageDimensions) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage.uri,
      type: selectedImage.mimeType || "image/jpeg",
      name: selectedImage.fileName || "image.jpg",
    });

    try {
      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/image-upload",
        {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          body: formData,
        },
      );

      const result = await response.json();

      if (mode === "background") {
        setBackgroundImage(result.data.url);
      } else {
        // Add image with actual dimensions
        addImage({
          type: "image",
          url: result.data.url,
          size: {
            width: imageDimensions.width,
            height: imageDimensions.height,
            aspectRatio: imageDimensions.aspectRatio,
          },
          position: {
            x: imageDimensions.width / 2,
            y: imageDimensions.height / 2,
          },
          id: `image-${Date.now()}`,
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setMode(null);
    setSelectedImage(null);
    onClose();
  };

  return (
    <BottomSheet visible={visible} onClose={handleClose}>
      <View style={styles.content}>
        {!mode ? (
          <>
            <Text style={styles.title}>Select Option</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setMode("background")}
              >
                <Text style={styles.buttonText}>Set as Background</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setMode("element")}
              >
                <Text style={styles.buttonText}>Add as Image Element</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {mode === "background" ? "Select Background" : "Add Image"}
            </Text>

            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.preview}
              />
            )}

            <View style={styles.actionContainer}>
              {!selectedImage ? (
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={openImagePicker}
                >
                  <Text style={styles.buttonText}>Select Image</Text>
                  <ImageIcon size={40} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={uploadImage}
                  disabled={uploading}
                >
                  {uploading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {mode === "background"
                        ? "Set as Background"
                        : "Add Image"}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e3a8a",
  },
  preview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 8,
  },
  buttonContainer: {
    gap: 12,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  optionButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    alignItems: "center",
  },
  selectButton: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButton: {
    padding: 12,
    backgroundColor: "#16a34a",
    borderRadius: 8,
    alignItems: "center",
    minWidth: 120,
  },
  cancelButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelText: {
    color: "#1e3a8a",
  },
});
