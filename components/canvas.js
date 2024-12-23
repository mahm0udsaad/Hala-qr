import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import TextElement from "./text-element";
import ShapeElement from "./shape-element";

const Canvas = ({
  textElements,
  shapeElements,
  backgroundColor,
  backgroundImage,
  onDeleteText,
  onEditText,
  onTextColorChange,
  onTextStyleChange,
  onDeleteShape,
  hideAllElementControls,
}) => {
  const handleCanvasTouch = () => {
    hideAllElementControls();
  };

  const CanvasContent = () => (
    <>
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
          onDelete={() => onDeleteText(textEl.id)}
          onEdit={() => onEditText(textEl.id)}
          onColorChange={(colors) => onTextColorChange(textEl.id, colors)}
          onStyleChange={(styles) => onTextStyleChange(textEl.id, styles)}
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
          onDelete={() => onDeleteShape(shapeEl.id)}
          isFilled={shapeEl.isFilled}
          strokeWidth={shapeEl.strokeWidth}
        />
      ))}
    </>
  );

  return (
    <TouchableWithoutFeedback onPress={handleCanvasTouch}>
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
    </TouchableWithoutFeedback>
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
