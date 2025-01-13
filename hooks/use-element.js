import { useCallback, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";

export const useTransformableElements = (elements = [], onUpdatePosition) => {
  // Keep track of shared values with a ref to persist them
  const sharedValuesMap = useRef({});
  console.log(elements);

  // Ensure elements is an array
  const safeElements = Array.isArray(elements) ? elements : [];

  // Cleanup function to remove unused values
  const cleanup = useCallback(() => {
    if (!safeElements.length) return;

    const currentIds = new Set(safeElements.map((el) => el.id));
    Object.keys(sharedValuesMap.current).forEach((id) => {
      if (!currentIds.has(id)) {
        delete sharedValuesMap.current[id];
      }
    });
  }, [safeElements]);

  // Get or create shared values for an element
  const getElementValues = useCallback((element) => {
    if (!element || !element.id) return null;

    if (!sharedValuesMap.current[element.id]) {
      sharedValuesMap.current[element.id] = {
        centerX: useSharedValue(element.position?.x ?? 0),
        centerY: useSharedValue(element.position?.y ?? 0),
        scale: useSharedValue(1),
        rotation: useSharedValue(0),
        savedScale: useSharedValue(1),
        lastRotation: useSharedValue(0),
      };
    }
    return sharedValuesMap.current[element.id];
  }, []);

  // Create transformable elements
  const transformableElements = safeElements.reduce((acc, element) => {
    const values = getElementValues(element);
    if (!values) return acc;

    const transform = useDerivedValue(
      () => [
        { translateX: values.centerX.value },
        { translateY: values.centerY.value },
        { rotate: values.rotation.value },
        { scale: values.scale.value },
      ],
      [],
    );

    const animatedStyle = useAnimatedStyle(
      () => ({
        transform: [
          { translateX: values.centerX.value },
          { translateY: values.centerY.value },
          { scale: values.scale.value },
          { rotate: `${values.rotation.value}rad` },
        ],
      }),
      [],
    );

    const createGestures = () => {
      const panGesture = Gesture.Pan()
        .averageTouches(true)
        .onChange((e) => {
          values.centerX.value += e.changeX;
          values.centerY.value += e.changeY;
        })
        .onEnd(() => {
          if (onUpdatePosition) {
            runOnJS(onUpdatePosition)(element.id, {
              x: values.centerX.value,
              y: values.centerY.value,
            });
          }
        });

      const pinchGesture = Gesture.Pinch()
        .onStart(() => {
          values.lastRotation.value = 0;
        })
        .onChange((e) => {
          values.scale.value = values.savedScale.value * e.scale;
        })
        .onEnd(() => {
          values.savedScale.value = values.scale.value;
        });

      const rotationGesture = Gesture.Rotation()
        .onStart(() => {
          values.lastRotation.value = 0;
        })
        .onChange((e) => {
          const delta = e.rotation - values.lastRotation.value;
          values.rotation.value += delta;
          values.lastRotation.value = e.rotation;
        });

      return Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture);
    };

    acc[element.id] = {
      transform,
      gestures: createGestures(),
      animatedStyle,
    };

    return acc;
  }, {});

  // Run cleanup
  cleanup();

  return transformableElements;
};
