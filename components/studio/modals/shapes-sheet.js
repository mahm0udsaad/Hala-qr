// ShapesSheet.js
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Square, Circle } from "lucide-react-native";
import { BottomSheet } from "./index";
import {
  CardIcon,
  InvitationCardIcon,
  TwoHeartsIcon,
  GiftIcon,
} from "./../icons";
import { Canvas } from "@shopify/react-native-skia";

// Helper component to render Skia icons as SVG
const SkiaIconWrapper = ({ IconComponent, size = 32, color = "#1e3a8a" }) => (
  <View style={{ width: size, height: size }}>
    <Canvas style={{ flex: 1 }}>
      <IconComponent size={size} color={color} />
    </Canvas>
  </View>
);

export const ShapesSheet = ({ visible, onClose, onSelectShape }) => {
  const shapes = [
    { id: "square", Icon: Square, label: "Square" },
    { id: "circle", Icon: Circle, label: "Circle" },
    {
      id: "card",
      Icon: ({ size, color }) => (
        <SkiaIconWrapper IconComponent={CardIcon} size={size} color={color} />
      ),
      label: "Card",
    },
    {
      id: "invitation",
      Icon: ({ size, color }) => (
        <SkiaIconWrapper
          IconComponent={InvitationCardIcon}
          size={size}
          color={color}
        />
      ),
      label: "Invitation",
    },
    {
      id: "hearts",
      Icon: ({ size, color }) => (
        <SkiaIconWrapper
          IconComponent={TwoHeartsIcon}
          size={size}
          color={color}
        />
      ),
      label: "Hearts",
    },
    {
      id: "gift",
      Icon: ({ size, color }) => (
        <SkiaIconWrapper IconComponent={GiftIcon} size={size} color={color} />
      ),
      label: "Gift",
    },
  ];

  const handleShapeSelect = (shapeId) => {
    const newElement = {
      id: `${shapeId}-${Date.now()}`,
      type: shapeId,
      color: "black",
      size: getShapeSize(shapeId),
      position: {
        x: 200,
        y: 200,
      },
    };
    onSelectShape(newElement);
    onClose();
  };

  const getShapeSize = (shapeId) => {
    switch (shapeId) {
      case "square":
        return { width: 80, height: 80 };
      case "circle":
        return { radius: 30 };
      case "card":
      case "invitation":
      case "hearts":
      case "gift":
        return { width: 100, height: 100 };
      default:
        return { width: 80, height: 80 };
    }
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Shape</Text>
        <View style={styles.shapeGrid}>
          {shapes.map(({ id, Icon, label }) => (
            <Pressable
              key={id}
              style={styles.shapeItem}
              onPress={() => handleShapeSelect(id)}
            >
              <Icon color="#1e3a8a" size={42} />
            </Pressable>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e3a8a",
  },
  shapeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  shapeItem: {
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 8,
    width: "30%",
    marginBottom: 16,
  },
  shapeLabel: {
    marginTop: 8,
    color: "#1e3a8a",
    fontSize: 14,
  },
});
