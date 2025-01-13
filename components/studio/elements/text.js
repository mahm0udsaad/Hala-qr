import React, { useState } from "react";
import { Pressable } from "react-native";
import { Group, Text, useFont, useT } from "@shopify/react-native-skia";
import { Edit2, Trash, MoreHorizontal } from "lucide-react-native";

const TextElement = ({ id, initialText = "New Text", onDelete }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [text, setText] = useState(initialText);

  const font = useFont(
    require("../../../assets/fonts/Cairo/static/Cairo-Regular.ttf"),
    32,
  );
  if (!font) return null;

  const handleTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setPosition({ x: locationX, y: locationY });
    onUpdatePosition(id, { x: locationX, y: locationY });
  };

  return (
    <Group>
      {isSelected && (
        <Group
          transform={[
            { translateX: position.x },
            { translateY: position.y - 40 },
          ]}
        >
          <Pressable
            onPress={() => {
              /* Handle edit */
            }}
          >
            <Edit2 color="#fbbf24" size={20} />
          </Pressable>
          <Pressable onPress={() => onDelete(id)}>
            <Trash color="#fbbf24" size={20} />
          </Pressable>
          <Pressable
            onPress={() => {
              /* Handle more options */
            }}
          >
            <MoreHorizontal color="#fbbf24" size={20} />
          </Pressable>
        </Group>
      )}
      <Text
        x={position.x}
        y={position.y}
        text={initialText}
        font={font}
        color={isDragging ? "blue" : "black"}
      />
    </Group>
  );
};

export default TextElement;
