import { View } from "react-native";
import { Canvas, Rect, Fill } from "@shopify/react-native-skia";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Group } from "lucide-react-native";

const RECT_SIZE = 60;

export const GestureTracking = () => {
  const x = useSharedValue(100);
  const y = useSharedValue(100);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    backgroundColor: "red",
    position: "absolute",
    top: -RECT_SIZE / 2,
    left: -RECT_SIZE / 2,
    width: RECT_SIZE,
    height: RECT_SIZE,
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  const panGesture = Gesture.Pan().onChange((e) => {
    x.value += e.changeX;
    y.value += e.changeY;
  });

  const rotationGesture = Gesture.Rotation().onChange((e) => {
    rotation.value += e.rotation;
  });

  const scaleGesture = Gesture.Pinch().onChange((e) => {
    scale.value = e.scale;
  });

  const composed = Gesture.Simultaneous(
    panGesture,
    rotationGesture,
    scaleGesture,
  );

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="white" />
        <Rect
          x={x}
          y={y}
          width={RECT_SIZE}
          height={RECT_SIZE}
          color="cyan"
          origin={{ x: RECT_SIZE / 2, y: RECT_SIZE / 2 }}
          transform={[{ scale: scale.value }]}
        />
      </Canvas>
      <GestureDetector gesture={composed}>
        <Animated.View style={style} />
      </GestureDetector>
    </View>
  );
};
