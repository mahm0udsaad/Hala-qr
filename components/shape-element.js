import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import {
  Trash2,
  EllipsisVertical,
  Minimize2,
  Maximize2,
} from "lucide-react-native";
import ShapeCustomizationModal from "./modals/cutomize-shape";

const { width, height } = Dimensions.get("window");

const ShapeElement = ({
  type,
  onDelete,
  initialX = width / 2,
  initialY = height / 2,
  shapeColor = "#1E3A8A",
  initialSize = 100,
}) => {
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;

  const [size, setSize] = useState(initialSize);
  const [showControls, setShowControls] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // New state for customization
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [currentColor, setCurrentColor] = useState(shapeColor);
  const [borderRadius, setBorderRadius] = useState(type === "circle" ? 100 : 8);
  const [shadowType, setShadowType] = useState("none");

  const handleToggleControls = useCallback(() => {
    setShowControls((prev) => !prev);
  }, []);

  const handleIncreaseSize = () => {
    setSize((prevSize) => prevSize + 10);
  };

  const handleDecreaseSize = () => {
    setSize((prevSize) => Math.max(30, prevSize - 10));
  };

  const handleCustomize = ({ shapeColor, borderRadius, shadowType }) => {
    setCurrentColor(shapeColor);
    setBorderRadius(borderRadius);
    setShadowType(shadowType);
  };
  // Drag Responder
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isResizing,
      onPanResponderGrant: () => {
        if (!isResizing) {
          pan.setOffset({ x: pan.x._value, y: pan.y._value });
          pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        if (!isResizing) {
          pan.flattenOffset();
        }
      },
    }),
  ).current;

  // Resize Responder
  const resizeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsResizing(true);
      },
      onPanResponderMove: (event, gestureState) => {
        // Calculate resize based on vertical movement
        const newSize = Math.max(30, size + gestureState.dy);
        setSize(newSize);
      },
      onPanResponderRelease: () => {
        setIsResizing(false);
      },
    }),
  ).current;

  const animatedStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  const renderShape = () => {
    const shapeStyle = [
      type === "square" ? styles.square : styles.circle,
      {
        width: size,
        height: size,
        backgroundColor: currentColor,
        borderRadius: type === "circle" ? 100 : borderRadius,
        ...(shadowType === "outer" && styles.outerShadow),
        ...(shadowType === "inner" && styles.innerShadow),
      },
    ];

    return <View style={shapeStyle} />;
  };

  return (
    <>
      <Animated.View
        style={[styles.shapeContainer, animatedStyle]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={handleToggleControls}
          style={styles.shapeWrapper}
        >
          {renderShape()}
        </TouchableOpacity>

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
              {...resizeResponder.panHandlers}
            >
              <Minimize2 size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity
              onPress={handleIncreaseSize}
              style={styles.resizeButton}
              {...resizeResponder.panHandlers}
            >
              <Maximize2 size={18} color="#1E3A8A" />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
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
        currentRadius={borderRadius}
        currentShadow={shadowType}
        onCustomize={handleCustomize}
      />
    </>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    padding: 4,
  },
  outerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  shapeContainer: {
    position: "absolute",
    alignSelf: "flex-start",
  },
  shapeWrapper: {
    padding: 8,
    borderRadius: 8,
  },
  square: {
    borderRadius: 8,
  },
  circle: {
    borderRadius: "100%",
  },
  controlButtons: {
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
  resizeButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
  separator: {
    marginHorizontal: 4,
    color: "#D1D5DB",
    fontSize: 20,
  },
});

export default ShapeElement;
