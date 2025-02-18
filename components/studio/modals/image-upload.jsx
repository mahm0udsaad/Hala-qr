import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageIcon, X } from "lucide-react-native";
import { useStudio } from "../context";
import { fetchInvitationImages } from "../../../helpers/get-images";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (visible) {
      loadImages();
    }
  }, [visible]);

  const loadImages = async (isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);
    try {
      const fetchedImages = await fetchInvitationImages(page);
      if (fetchedImages.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) =>
          isLoadMore ? [...prev, ...fetchedImages] : fetchedImages,
        );
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadImages(true);
    }
  };

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
      handleDeviceImageUpload(result.assets[0], dimensions);
    }
  };

  const handlePexelsImageSelect = async (image) => {
    const dimensions = await getImageDimensions(image.src.original);

    if (mode === "background") {
      setBackgroundImage(image.src.original);
    } else {
      addImage({
        type: "image",
        url: image.src.original,
        size: {
          width: dimensions.width,
          height: dimensions.height,
          aspectRatio: dimensions.aspectRatio,
        },
        position: {
          x: dimensions.width / 2,
          y: dimensions.height / 2,
        },
        id: `image-${Date.now()}`,
      });
    }
    handleClose();
  };

  const handleDeviceImageUpload = async (image, dimensions) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: image.mimeType || "image/jpeg",
        name: image.fileName || "image.jpg",
      });

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
        addImage({
          type: "image",
          url: result.data.url,
          size: {
            width: dimensions.width,
            height: dimensions.height,
            aspectRatio: dimensions.aspectRatio,
          },
          position: {
            x: dimensions.width / 2,
            y: dimensions.height / 2,
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
    setImages([]);
    setPage(1);
    setHasMore(true);
    onClose();
  };

  const renderImage = ({ item }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => handlePexelsImageSelect(item)}
    >
      <Image source={{ uri: item.src.medium }} style={styles.galleryImage} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#1e3a8a" />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Image</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#1e3a8a" />
            </TouchableOpacity>
          </View>

          {!mode ? (
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
          ) : (
            <>
              {loading && page === 1 ? (
                <ActivityIndicator
                  size="large"
                  color="#1e3a8a"
                  style={styles.loader}
                />
              ) : (
                <FlatList
                  data={images}
                  renderItem={renderImage}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.imageGrid}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  ListHeaderComponent={
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={openImagePicker}
                    >
                      <ImageIcon size={24} color="white" />
                      <Text style={styles.buttonText}>Upload from Device</Text>
                    </TouchableOpacity>
                  }
                  ListFooterComponent={renderFooter}
                />
              )}
            </>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  closeButton: {
    padding: 4,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  imageGrid: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  galleryImage: {
    width: "100%",
    aspectRatio: 1,
  },
  optionButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButton: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
