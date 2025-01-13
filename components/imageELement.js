import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import {
  Trash2,
  EllipsisVertical,
  Minimize2,
  Maximize2,
} from "lucide-react-native";
import { useStudio } from "../context";

const ImageElement = ({
  id,
  src,
  initialX,
  initialY,
  initialSize = 200,
  onDelete,
  showControls,
}) => {
  const { toggleElementControls, updateElementPosition, updateImageSize } =
    useStudio();
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const [size, setSize] = useState(initialSize);

  const handleToggleControls = () => {
    toggleElementControls("image", id);
  };

  const handleIncreaseSize = () => {
    const newSize = size + 20;
    setSize(newSize);
    updateImageSize(id, newSize);
  };

  const handleDecreaseSize = () => {
    const newSize = Math.max(50, size - 20);
    setSize(newSize);
    updateImageSize(id, newSize);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        updateElementPosition("image", id, pan.x._value, pan.y._value);
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.container, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={handleToggleControls}>
        <Image source={{ uri: src }} style={{ width: size, height: size }} />
      </TouchableOpacity>

      {showControls && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleDecreaseSize} style={styles.button}>
            <Minimize2 size={18} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncreaseSize} style={styles.button}>
            <Maximize2 size={18} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Trash2 size={18} color="#FF0000" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  controls: {
    flexDirection: "row",
    position: "absolute",
    top: -40,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    padding: 4,
    marginHorizontal: 2,
  },
});

export default ImageElement;
