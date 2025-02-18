import React from "react";
import {
  Rect,
  Group,
  Text,
  useFont,
  Image as SkiaImage,
  useImage,
  ImageSVG,
  useSVG,
  rect,
  fitbox,
} from "@shopify/react-native-skia";

const CanvasImageElement = ({ element, transform }) => {
  const image = useImage(element.url);

  if (!image) {
    return (
      <Group
        transform={[
          { translateX: transform?.translateX || element.position.x },
          { translateY: transform?.translateY || element.position.y },
          { scale: transform?.scale || 1 },
          { rotate: transform?.rotate || 0 },
        ]}
      >
        <Rect x={0} y={0} width={100} height={100} color="#E5E7EB" />
      </Group>
    );
  }

  const aspectRatio = image.width() / image.height();
  const displayWidth = 200;
  const displayHeight = displayWidth / aspectRatio;

  return (
    <Group
      transform={[
        { translateX: transform?.translateX || element.position.x },
        { translateY: transform?.translateY || element.position.y },
        { scale: transform?.scale || 1 },
        { rotate: transform?.rotate || 0 },
      ]}
    >
      <SkiaImage
        image={image}
        x={displayWidth / 2}
        y={displayHeight / 2}
        width={displayWidth}
        height={displayHeight}
        fit="contain"
        opacity={element.opacity || 1}
      />
    </Group>
  );
};

const CanvasIconElement = ({ element, transform }) => {
  const svg = useSVG(element.thumbnail); // Use thumbnail from the element object

  if (!svg) {
    return null;
  }

  const matrix = transform
    ? [
        { translateX: transform.translateX },
        { translateY: transform.translateY },
        { scale: transform.scale },
        { rotate: transform.rotate },
      ]
    : [
        { translateX: element.position.x },
        { translateY: element.position.y },
        { scale: 1 },
        { rotate: 0 },
      ];

  // Create source and destination rectangles for fitting
  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, element.size.width, element.size.width);

  return (
    <Group transform={matrix}>
      <Group transform={fitbox("contain", src, dst)}>
        <ImageSVG
          svg={svg}
          width={svg.width()}
          height={svg.height()}
          opacity={element.opacity || 1}
        />
      </Group>
    </Group>
  );
};

export const CanvasElement = ({ element, transform }) => {
  if (!element) return null;

  const font = useFont(
    require("../../../assets/fonts/Cairo/static/Cairo-Regular.ttf"),
    32,
  );

  // Handle basic shapes first
  switch (element.type) {
    case "text":
      return (
        <Group
          transform={[
            { translateX: transform?.translateX || element.position.x },
            { translateY: transform?.translateY || element.position.y },
            { scale: transform?.scale || 1 },
            { rotate: transform?.rotate || 0 },
          ]}
        >
          <Text
            x={element.size.width / 4}
            y={element.size.height / 1.5}
            text={element.text}
            font={font}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "image":
      return <CanvasImageElement element={element} transform={transform} />;
    default:
      // Handle icons using the thumbnail URL
      return <CanvasIconElement element={element} transform={transform} />;
  }
};

export const CanvasElementPreview = ({ element }) => {
  if (!element) return null;

  const svg = useSVG(element.thumbnail); // Use thumbnail from the element object

  if (!svg) {
    return null;
  }

  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, element.size.width, element.size.width);

  return (
    <Group transform={fitbox("contain", src, dst)}>
      <ImageSVG
        svg={svg}
        width={svg.width()}
        height={svg.height()}
        opacity={element.opacity || 1}
      />
    </Group>
  );
};
