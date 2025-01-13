import React from "react";
import {
  Rect,
  Group,
  Circle,
  Text,
  useFont,
  Image as SkiaImage,
  useImage,
} from "@shopify/react-native-skia";
import {
  CardIcon,
  InvitationCardIcon,
  TwoHeartsIcon,
  GiftIcon,
} from "./../icons";

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

export const CanvasElement = ({ element, transform }) => {
  if (!element) return null;
  const font = useFont(
    require("../../../assets/fonts/Cairo/static/Cairo-Regular.ttf"),
    32,
  );

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

  switch (element.type) {
    case "square":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <Rect
            x={-element.size.width / 2}
            y={-element.size.width / 2}
            width={element.size.width}
            height={element.size.height}
          />
        </Group>
      );
    case "circle":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <Circle cx={0} cy={0} r={element.size.radius} />
        </Group>
      );
    case "card":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <CardIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "invitation":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <InvitationCardIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "hearts":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <TwoHeartsIcon size={element.size.width} color={element.color} />
        </Group>
      );
    case "gift":
      return (
        <Group
          transform={matrix}
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <GiftIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "text":
      return (
        <Group transform={matrix}>
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
      return <CanvasImageElement element={element} transform={matrix} />;
    default:
      return null;
  }
};

export const CanvasElementPreview = ({ element }) => {
  if (!element) return null;

  switch (element.type) {
    case "square":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <Rect
            x={-element.size.width / 2}
            y={-element.size.width / 2}
            width={element.size.width}
            height={element.size.height}
          />
        </Group>
      );
    case "circle":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <Circle cx={0} cy={0} r={element.size.radius} />
        </Group>
      );
    case "card":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <CardIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "invitation":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <InvitationCardIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    case "hearts":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <TwoHeartsIcon size={element.size.width} color={element.color} />
        </Group>
      );
    case "gift":
      return (
        <Group
          style={element.style === "stroke" ? `stroke` : `fill`}
          strokeWidth={
            element.style === "stroke" ? element.strokeWidth : undefined
          }
        >
          <GiftIcon
            size={element.size.width}
            color={element.color}
            opacity={element.opacity || 1}
          />
        </Group>
      );
    default:
      return null;
  }
};
