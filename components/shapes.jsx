"use dom";
export default function Shape({ type, color, className = "" }) {
  switch (type) {
    case "circle":
      return (
        <div
          className={`rounded-full ${className}`}
          style={{ backgroundColor: color }}
        />
      );
    case "square":
      return <div className={className} style={{ backgroundColor: color }} />;
    case "rounded-square":
      return (
        <div
          className={`rounded-lg ${className}`}
          style={{ backgroundColor: color }}
        />
      );
    case "triangle":
      return (
        <div
          className={className}
          style={{
            width: 0,
            height: 0,
            borderLeft: "50px solid transparent",
            borderRight: "50px solid transparent",
            borderBottom: `100px solid ${color}`,
          }}
        />
      );
    case "pentagon":
      return (
        <div
          className={className}
          style={{
            width: "100px",
            height: "95px",
            background: color,
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        />
      );
    case "hexagon":
      return (
        <div
          className={className}
          style={{
            width: "100px",
            height: "57px",
            background: color,
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      );
    case "star":
      return (
        <div
          className={className}
          style={{
            width: "100px",
            height: "100px",
            background: color,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      );
    case "heart":
      return (
        <div
          className={className}
          style={{
            width: "100px",
            height: "90px",
            background: color,
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
