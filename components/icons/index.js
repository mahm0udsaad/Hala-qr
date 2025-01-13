import React from "react";
import { Canvas, Path } from "@shopify/react-native-skia";

// Base shape component with consistent sizing and fill/stroke control
const ShapeWrapper = ({ size, children }) => (
  <Canvas style={{ width: size, height: size }}>{children}</Canvas>
);

export const Square = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 6} ${size / 6} H${(size * 5) / 6} V${(size * 5) / 6} H${
        size / 6
      } Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
    />
  </ShapeWrapper>
);

export const Circle = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 8} 
         a ${(size * 3) / 8} ${(size * 3) / 8} 0 1 1 0 ${(size * 3) / 4} 
         a ${(size * 3) / 8} ${(size * 3) / 8} 0 1 1 0 -${(size * 3) / 4}`}
      color={color}
      strokeWidth={strokeWidth}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Triangle = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 6} L${(size * 5) / 6} ${(size * 5) / 6} L${
        size / 6
      } ${(size * 5) / 6} Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Pentagon = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 6} L${(size * 4) / 5} ${(size * 11) / 24} L${
        (size * 7) / 10
      } ${(size * 4) / 5} L${(size * 3) / 10} ${(size * 4) / 5} L${size / 5} ${
        (size * 11) / 24
      } Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Hexagon = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 6} 
         L${(size * 5) / 6} ${(size * 1) / 3} 
         L${(size * 5) / 6} ${(size * 2) / 3} 
         L${size / 2} ${(size * 5) / 6} 
         L${size / 6} ${(size * 2) / 3} 
         L${size / 6} ${(size * 1) / 3} Z`}
      color={color}
      strokeWidth={strokeWidth}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Star = ({ size = 100, color, strokeWidth = 1, fill = false }) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 6} L${(size * 3) / 5} ${(size * 5) / 12} L${
        (size * 4) / 5
      } ${(size * 5) / 12} L${(size * 2) / 3} ${(size * 7) / 12} L${
        (size * 7) / 10
      } ${(size * 4) / 5} L${size / 2} ${(size * 2) / 3} L${(size * 3) / 10} ${
        (size * 4) / 5
      } L${size / 3} ${(size * 7) / 12} L${size / 5} ${(size * 5) / 12} L${
        (size * 2) / 5
      } ${(size * 5) / 12} Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Heart = ({ size = 100, color, strokeWidth = 1, fill = false }) => {
  const middle = size / 2;
  const quarter = size / 4;
  const third = size / 3;

  const path = [
    `M ${middle} ${size * 0.8}`, // Start at bottom middle
    `C ${middle} ${size * 0.7}`, // First control point
    `${quarter} ${size * 0.5}`, // Second control point
    `${quarter} ${third}`, // Left side curve
    `C ${quarter} ${quarter}`, // Left top bump control
    `${third} ${quarter}`, // Left bump
    `${middle} ${size * 0.3}`, // Top center point
    `C ${size - third} ${quarter}`, // Right bump start
    `${size - quarter} ${quarter}`, // Right bump
    `${size - quarter} ${third}`, // Right curve end
    `C ${size - quarter} ${size * 0.5}`, // Right side curve
    `${middle} ${size * 0.7}`, // Bottom middle control
    `${middle} ${size * 0.8}`, // End back to start
    "Z", // Close path
  ].join(" ");

  return (
    <ShapeWrapper size={size}>
      <Path
        path={path}
        color={color}
        strokeWidth={strokeWidth}
        stroke={color}
        style={fill ? "fill" : "stroke"}
        strokeJoin="round"
        strokeCap="round"
      />
    </ShapeWrapper>
  );
};

export const Diamond = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${size / 2} ${size / 6} L${(size * 4) / 5} ${size / 2} L${
        size / 2
      } ${(size * 5) / 6} L${size / 5} ${size / 2} Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);

export const Octagon = ({
  size = 100,
  color,
  strokeWidth = 1,
  fill = false,
}) => (
  <ShapeWrapper size={size}>
    <Path
      path={`M${(size * 5) / 16} ${size / 6} L${(size * 11) / 16} ${
        size / 6
      } L${(size * 5) / 6} ${(size * 5) / 16} L${(size * 5) / 6} ${
        (size * 11) / 16
      } L${(size * 11) / 16} ${(size * 5) / 6} L${(size * 5) / 16} ${
        (size * 5) / 6
      } L${size / 6} ${(size * 11) / 16} L${size / 6} ${(size * 5) / 16} Z`}
      color={color}
      strokeWidth={strokeWidth}
      stroke={color}
      style={fill ? "fill" : "stroke"}
      strokeJoin="round"
      strokeCap="round"
    />
  </ShapeWrapper>
);
