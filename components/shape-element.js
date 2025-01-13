import React, { useState, useRef, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import {
  Trash2,
  EllipsisVertical,
  Minimize2,
  Maximize2,
} from "lucide-react-native";
import ShapeCustomizationModal from "./modals/cutomize-shape";
import { useStudio } from "../context";
import {
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Star,
  Heart,
  Diamond,
  Octagon,
} from "./icons";
import TouchableWrapper from "./el-wrapper";

const ShapeElement = ({
  type,
  onDelete,
  initialX,
  initialY,
  shapeColor = "#1E3A8A",
  initialSize = 100,
  id,
  showControls,
  isFilled,
  strokeWidth,
}) => {
  const {
    toggleElementControls,
    updateElementPosition,
    customizeShape,
    updateShapeSize,
  } = useStudio();
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;
  const [size, setSize] = useState(initialSize);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [currentColor, setCurrentColor] = useState(shapeColor);

  const handleIncreaseSize = () => {
    const newSize = size + 10;
    setSize(newSize);
    updateShapeSize(id, newSize);
  };

  const handleDecreaseSize = () => {
    const newSize = Math.max(30, size - 10);
    setSize(newSize);
    updateShapeSize(id, newSize);
  };

  const handleCustomize = ({ shapeColor, strokeWidth, isFilled }) => {
    setCurrentColor(shapeColor);
    customizeShape(id, shapeColor, strokeWidth, isFilled);
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
        updateElementPosition("shape", id, pan.x._value, pan.y._value);
      },
    }),
  ).current;

  const getShapeIcon = () => {
    const props = {
      size,
      color: currentColor,
      strokeWidth: strokeWidth,
      fill: isFilled,
    };

    const shapes = {
      square: Square,
      circle: Circle,
      triangle: Triangle,
      pentagon: Pentagon,
      hexagon: Hexagon,
      star: Star,
      heart: Heart,
      diamond: Diamond,
      octagon: Octagon,
    };

    const ShapeComponent = shapes[type] || Square;
    return <ShapeComponent {...props} />;
  };

  return (
    <>
      <Animated.View
        style={[
          styles.shapeContainer,
          { transform: pan.getTranslateTransform() },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableWrapper
          onElementPress={() => toggleElementControls("shape", id)}
          style={styles.shapeWrapper}
        >
          {getShapeIcon()}
        </TouchableWrapper>

        {showControls && (
          <View style={styles.controlButtons}>
            <TouchableOpacity
              onPress={() => setShowCustomizationModal(true)}
              style={styles.controlButton}
            >
              <EllipsisVertical size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDecreaseSize}
              style={styles.resizeButton}
            >
              <Minimize2 size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleIncreaseSize}
              style={styles.resizeButton}
            >
              <Maximize2 size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Trash2 size={18} color="#FF0000" />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <ShapeCustomizationModal
        visible={showCustomizationModal}
        onClose={() => setShowCustomizationModal(false)}
        shapeType={type}
        currentColor={currentColor}
        onCustomize={handleCustomize}
        currentFilled={isFilled}
        currentStrokeWidth={strokeWidth}
      />
    </>
  );
};

const styles = StyleSheet.create({
  shapeContainer: {
    position: "absolute",
    alignSelf: "flex-start",
  },
  controlButtons: {
    flexDirection: "row",
    position: "absolute",
    top: -20,
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
  controlButton: {
    padding: 4,
  },
  resizeButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
});

export default ShapeElement;
