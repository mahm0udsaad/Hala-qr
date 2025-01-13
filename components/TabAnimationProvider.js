import React, { createContext, useContext, useState } from "react";
import { Animated } from "react-native";

const TabAnimationContext = createContext();

export const useTabAnimation = () => useContext(TabAnimationContext);

export const TabAnimationProvider = ({ children }) => {
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    if (!animationEnabled) return {};

    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          })
        : 0,
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [screen.width, 0, screen.width * -0.3],
                extrapolate: "clamp",
              }),
              inverted,
            ),
          },
        ],
      },
    };
  };

  return (
    <TabAnimationContext.Provider
      value={{ forSlide, animationEnabled, setAnimationEnabled }}
    >
      {children}
    </TabAnimationContext.Provider>
  );
};
