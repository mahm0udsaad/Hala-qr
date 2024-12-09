"use dom";
export default function Shape({ type, color, style }) {
  const shapeStyle = {
    ...style,
    backgroundColor: color,
  };

  switch (type) {
    case "circle":
      return <div style={{ ...shapeStyle, borderRadius: "50%" }} />;
    case "square":
      return <div style={shapeStyle} />;
    case "rounded-square":
      return <div style={{ ...shapeStyle, borderRadius: "0.5rem" }} />;
    case "triangle":
      return (
        <div
          style={{
            ...style,
            width: 0,
            height: 0,
            borderLeft: `${style.width / 2}px solid transparent`,
            borderRight: `${style.width / 2}px solid transparent`,
            borderBottom: `${style.height}px solid ${color}`,
          }}
        />
      );
    case "pentagon":
      return (
        <div
          style={{
            ...shapeStyle,
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        />
      );
    case "hexagon":
      return (
        <div
          style={{
            ...shapeStyle,
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      );
    case "star":
      return (
        <div
          style={{
            ...shapeStyle,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      );
    case "heart":
      return (
        <div
          style={{
            ...shapeStyle,
            clipPath:
              "polygon(50% 0%, 100% 35%, 100% 70%, 50% 100%, 0% 70%, 0% 35%)",
            borderRadius: "50%",
          }}
        />
      );
    default:
      return null;
  }
}
