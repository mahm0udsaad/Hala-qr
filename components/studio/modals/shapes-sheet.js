import React, { useState, useEffect } from "react";
import {
  Image,
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { X } from "lucide-react-native";
import { icons } from "./../icons";
import {
  Canvas,
  ImageSVG,
  useSVG,
  Group,
  rect,
  fitbox,
} from "@shopify/react-native-skia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Keeping the renderer components the same
const SkiaSvgRenderer = ({ url, size = 42 }) => {
  const svg = useSVG(url);

  if (!svg) {
    return null;
  }

  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, size, size);

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={{ flex: 1 }}>
        <Group transform={fitbox("contain", src, dst)}>
          <ImageSVG svg={svg} width={svg.width()} height={svg.height()} />
        </Group>
      </Canvas>
    </View>
  );
};

const IconRenderer = ({ item, size = 42 }) => {
  if (item.thumbnail) {
    return <SkiaSvgRenderer url={item.thumbnail} size={size} />;
  }

  return (
    <SkiaIconWrapper Component={item.component} color="#1e3a8a" size={size} />
  );
};

const SkiaIconWrapper = ({ Component, size = 32, color = "#1e3a8a" }) => (
  <View style={{ width: size, height: size }}>
    <Canvas style={{ flex: 1 }}>
      <Component size={size} color={color} />
    </Canvas>
  </View>
);

export const ShapesSheet = ({ visible, onClose, onSelectShape }) => {
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 40;

  // Reset states when modal is opened
  useEffect(() => {
    if (visible) {
      // Reset all states when modal opens
      setVisibleIcons([]);
      setPage(1);
      setLoading(false);
    }
  }, [visible]);

  // Load initial icons when the component mounts or resets
  useEffect(() => {
    if (visible && page === 1 && visibleIcons.length === 0) {
      loadIcons();
    }
  }, [visible, page]);

  const loadIcons = () => {
    if (loading || page * itemsPerPage >= icons.length) return;

    setLoading(true);

    // Calculate the new icons to load
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, icons.length);

    // Use requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => {
      const newIcons = icons.slice(startIndex, endIndex);

      setVisibleIcons((prev) => [...prev, ...newIcons]);
      setPage((prev) => prev + 1);
      setLoading(false);
    });
  };

  const handleShapeSelect = (shape) => {
    const newElement = {
      id: `${shape.icon_name}-${Date.now()}`,
      type: shape.icon_name,
      color: "black",
      size: { width: 80, height: 80 },
      position: { x: 200, y: 200 },
      thumbnail: shape.thumbnail,
    };

    // Wrap in requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => {
      onSelectShape(newElement);
      onClose();
    });
  };

  const handleClose = () => {
    // Reset states before closing
    setVisibleIcons([]);
    setPage(1);
    setLoading(false);
    onClose();
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
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
            <Text style={styles.title}>Select Shape</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#1e3a8a" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={visibleIcons}
            keyExtractor={(item, index) => `${item.icon_name}-${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.shapeItem}
                onPress={() => handleShapeSelect(item)}
              >
                <IconRenderer item={item} size={42} />
              </TouchableOpacity>
            )}
            onEndReached={loadIcons}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            removeClippedSubviews={true}
            maxToRenderPerBatch={9}
            windowSize={5}
          />
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
  listContainer: {
    paddingHorizontal: 16,
    gap: 10,
    alignItems: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  shapeItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "white",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
