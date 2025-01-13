import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { ControlButtons } from "./controle-btns";

// Previous utility functions remain the same
const calculateTextWidth = (text, fontSize = 32) => {
  const averageCharWidth = fontSize / 2;
  const padding = fontSize;
  return text.length * averageCharWidth + padding;
};

const getElementDimensions = (element) => {
  // Previous element dimensions logic remains the same
  switch (element.type) {
    case "text":
      const textWidth = calculateTextWidth(element.text);
      return {
        width: textWidth,
        height: element.size.height || 40,
        offset: { x: textWidth / 2, y: 20 },
      };

    case "image":
      return {
        width: element.size.width,
        height: element.size.height,
        offset: {
          x: element.size.width / 2,
          y: element.size.height / 2,
        },
      };
    // ... other cases remain the same
    default:
      return {
        width: element.size.width,
        height: element.size.height,
        offset: {
          x: element.size.width / 2,
          y: element.size.height / 2,
        },
      };
  }
};

const GestureHandler = ({
  element,
  onGestureEnd,
  onTransformUpdate,
  onShowMore,
  onEdit,
  onDelete,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const centerX = useSharedValue(element.position.x);
  const centerY = useSharedValue(element.position.y);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const lastRotation = useSharedValue(0);
  const dimensions = getElementDimensions(element);

  useEffect(() => {
    centerX.value = element.position.x;
    centerY.value = element.position.y;
  }, [element.position.x, element.position.y]);

  const tapGesture = Gesture.Tap().onStart(() => {
    runOnJS(setIsSelected)(!isSelected);
  });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      runOnJS(setIsInteracting)(true);
    })
    .onChange((event) => {
      centerX.value += event.changeX;
      centerY.value += event.changeY;
      runOnJS(onTransformUpdate)({
        translateX: centerX.value,
        translateY: centerY.value,
        scale: scale.value,
        rotate: rotation.value,
      });
    })
    .onEnd(() => {
      runOnJS(setIsInteracting)(false);
      runOnJS(onGestureEnd)({
        x: centerX.value,
        y: centerY.value,
      });
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
      runOnJS(setIsInteracting)(true);
    })
    .onChange((event) => {
      scale.value = savedScale.value * event.scale;
      runOnJS(onTransformUpdate)({
        translateX: centerX.value,
        translateY: centerY.value,
        scale: scale.value,
        rotate: rotation.value,
      });
    })
    .onEnd(() => {
      runOnJS(setIsInteracting)(false);
    });

  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      lastRotation.value = rotation.value;
      runOnJS(setIsInteracting)(true);
    })
    .onChange((event) => {
      rotation.value = lastRotation.value + event.rotation;
      runOnJS(onTransformUpdate)({
        translateX: centerX.value,
        translateY: centerY.value,
        scale: scale.value,
        rotate: rotation.value,
      });
    })
    .onEnd(() => {
      runOnJS(setIsInteracting)(false);
    });

  const gesture = Gesture.Simultaneous(
    tapGesture,
    panGesture,
    pinchGesture,
    rotationGesture,
  );

  const animatedStyle = useAnimatedStyle(() => {
    const scaledWidth = dimensions.width * scale.value;
    const scaledHeight = dimensions.height * scale.value;

    return {
      transform: [
        { translateX: centerX.value },
        { translateY: centerY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}rad` },
      ],
      width: scaledWidth,
      height: scaledHeight,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.hitArea,
          animatedStyle,
          (isSelected || isInteracting) && styles.selectedHitArea,
          !isSelected && !isInteracting && styles.hiddenHitArea,
        ]}
      >
        {isSelected && (
          <ControlButtons
            scale={scale.value}
            isText={element.type === "text"}
            onShowMore={() => {
              onShowMore?.(element.id);
              setIsSelected(false);
            }}
            onEdit={() => {
              onEdit?.(element.id);
              setIsSelected(false);
            }}
            onDelete={() => {
              onDelete?.(element.id);
              setIsSelected(false);
            }}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  hitArea: {
    position: "absolute",
    borderRadius: 4,
    left: 0,
    top: 0,
  },
  selectedHitArea: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  hiddenHitArea: {
    backgroundColor: "transparent",
  },
  controlsContainer: {
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
    zIndex: 1000,
    transformOrigin: "right bottom",
  },
  controlButton: {
    padding: 4,
  },
  separator: {
    marginHorizontal: 4,
    color: "#D1D5DB",
    fontSize: 20,
  },
});

export default GestureHandler;
