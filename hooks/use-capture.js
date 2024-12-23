import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  Platform,
  PermissionsAndroid,
  Alert,
  Dimensions,
  InteractionManager,
} from "react-native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const { width, height } = Dimensions.get("window");

const useCapture = () => {
  const captureRef = useRef(null);
  const [captureConfig, setCaptureConfig] = useState({
    format: "jpg",
    quality: 1,
    result: "tmpfile",
    width: null,
    height: null,
  });

  // Diagnostic logging function
  const logDiagnosticInfo = () => {
    console.log("Diagnostic Information:", {
      platformOS: Platform.OS,
      screenWidth: width,
      screenHeight: height,
      captureRefCurrent: !!captureRef.current,
      captureConfig: captureConfig,
    });
  };

  // Enhanced permission request
  const requestPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const androidPermissions = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();

        const permissionStatus =
          Object.values(androidPermissions).every(
            (status) => status === PermissionsAndroid.RESULTS.GRANTED,
          ) && mediaLibraryPermission.status === "granted";

        return permissionStatus;
      }

      // For iOS, request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Permission Request Error:", error);
      return false;
    }
  };

  // Save image to gallery or share
  const saveOrShareImage = async (uri) => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("DesignStudio", asset, false);
        Alert.alert("Success", "Image saved to gallery");
      }
    } catch (error) {
      console.error("Save/Share Error:", error);
      Alert.alert("Error", `Failed to save/share: ${error.message}`);
    }
  };

  // Advanced capture method with multiple fallback strategies
  const captureImage = useCallback(async (format = "jpg") => {
    // Log diagnostic information
    logDiagnosticInfo();

    try {
      // Check and request permissions
      const hasPermissions = await requestPermissions();
      if (!hasPermissions) {
        Alert.alert(
          "Permissions Required",
          "Cannot proceed without storage permissions",
        );
        return;
      }

      // Wait for interactions to complete
      await new Promise((resolve) =>
        InteractionManager.runAfterInteractions(resolve),
      );

      // Validate capture reference
      if (!captureRef.current) {
        throw new Error("Capture reference is not available");
      }

      // Dynamic configuration based on screen size
      const dynamicConfig = {
        format,
        quality: 1,
        result: "tmpfile",
        width: width * 0.9, // 90% of screen width
        height: height * 0.8, // 80% of screen height
      };

      // Capture with detailed error handling
      const uri = await ViewShot.captureRef(captureRef.current, dynamicConfig);

      console.log("Capture Successful:", { uri });

      // Save or share the image
      await saveOrShareImage(uri);
    } catch (error) {
      console.error("Capture Detailed Error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      // Comprehensive error handling
      if (error.message.includes("Failed to snapshot")) {
        Alert.alert(
          "Capture Failed",
          "Unable to capture the view. Possible reasons:\n" +
            "- View not fully rendered\n" +
            "- Layout constraints\n" +
            "- Nested scroll views\n" +
            "Try adjusting your layout or waiting for full render.",
          [{ text: "OK" }],
        );
      } else {
        Alert.alert(
          "Unexpected Error",
          `Capture process encountered an issue: ${error.message}`,
          [{ text: "OK" }],
        );
      }
    }
  }, []);

  return {
    captureRef, // Ref to attach to the view
    captureImage, // Method to trigger capture
  };
};

export default useCapture;
