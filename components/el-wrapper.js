import React, { useState, useCallback, useRef } from "react";
import { TouchableOpacity, Platform, View } from "react-native";

const TouchableWrapper = ({
  children,
  onElementPress,
  style,
  hitSlop = { top: 10, bottom: 10, left: 10, right: 10 },
  delayLongPress = 500,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const touchStartRef = useRef(null);
  const lastPressTimeRef = useRef(0);

  // Constants for touch handling
  const TOUCH_THRESHOLD = 5; // pixels
  const DOUBLE_TAP_DELAY = 300; // ms
  const PRESS_DURATION_THRESHOLD = 200; // ms

  const handleTouchStart = useCallback((event) => {
    touchStartRef.current = {
      timestamp: Date.now(),
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
    setIsPressed(true);
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      setIsPressed(false);

      if (!touchStartRef.current) return;

      const touchEnd = {
        timestamp: Date.now(),
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };

      // Calculate touch duration and distance
      const duration = touchEnd.timestamp - touchStartRef.current.timestamp;
      const distance = Math.sqrt(
        Math.pow(touchEnd.x - touchStartRef.current.x, 2) +
          Math.pow(touchEnd.y - touchStartRef.current.y, 2),
      );

      // Prevent double triggers
      const timeSinceLastPress = touchEnd.timestamp - lastPressTimeRef.current;
      if (timeSinceLastPress < DOUBLE_TAP_DELAY) {
        return;
      }

      // Valid press detection
      if (duration < PRESS_DURATION_THRESHOLD && distance < TOUCH_THRESHOLD) {
        lastPressTimeRef.current = touchEnd.timestamp;

        // Use setTimeout to ensure the touch end event is fully processed
        setTimeout(
          () => {
            onElementPress?.();
          },
          Platform.select({
            android: 10, // Small delay for Android
            ios: 0,
            default: 0,
          }),
        );
      }

      touchStartRef.current = null;
    },
    [onElementPress],
  );

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    touchStartRef.current = null;
  }, []);

  // Samsung-specific workaround
  const isSamsungDevice = Platform.OS === "android" && Platform.Version >= 28;

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onElementPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={handlePressOut}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        delayPressIn={0}
        delayPressOut={0}
        delayLongPress={delayLongPress}
        activeOpacity={1}
        hitSlop={hitSlop}
        // Samsung-specific optimizations
        pressRetentionOffset={
          isSamsungDevice
            ? { top: 20, left: 20, right: 20, bottom: 20 }
            : undefined
        }
        style={[
          { userSelect: "none" },
          isSamsungDevice && {
            touchAction: "none",
            cursor: "pointer",
          },
        ]}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default TouchableWrapper;
