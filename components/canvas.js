import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import TextElement from "./text-element";
import ShapeElement from "./shape-element";
import { useStudio } from "../context";
import ImageElement from "./imageELement";

const Canvas = () => {
  const { state } = useStudio();
  const {
    textElements,
    shapeElements,
    imageElements,
    canvasBackground: backgroundColor,
    backgroundImage,
  } = state;

  const CanvasContent = () => (
    <>
      {imageElements?.map((img) => (
        <ImageElement
          key={img.id}
          initialX={img.x}
          initialY={img.y}
          initialSize={img.size}
          src={img.src}
          id={img.id}
          showControls={img.showControls}
        />
      ))}
      {textElements.map((textEl) => (
        <TextElement
          key={textEl.id}
          id={textEl.id}
          text={textEl.content}
          initialX={textEl.x}
          initialY={textEl.y}
          textColor={textEl.textColor}
          backgroundColor={textEl.backgroundColor}
          fontSize={textEl.fontSize}
          fontWeight={textEl.fontWeight}
          fontFamily={textEl.fontFamily}
          showControls={textEl.showControls}
        />
      ))}
      {shapeElements.map((shapeEl) => (
        <ShapeElement
          key={shapeEl.id}
          id={shapeEl.id}
          type={shapeEl.type}
          shapeColor={shapeEl.color}
          initialX={shapeEl.x}
          initialY={shapeEl.y}
          initialSize={shapeEl.size}
          showControls={shapeEl.showControls}
          isFilled={shapeEl.isFilled}
          strokeWidth={shapeEl.strokeWidth}
        />
      ))}
    </>
  );

  return (
    <>
      {backgroundImage ? (
        <ImageBackground
          collapsable={false}
          source={{ uri: backgroundImage }}
          style={[styles.canvas, { backgroundColor }]}
          resizeMode="cover"
        >
          <CanvasContent />
        </ImageBackground>
      ) : (
        <View collapsable={false} style={[styles.canvas, { backgroundColor }]}>
          <CanvasContent />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default Canvas;
