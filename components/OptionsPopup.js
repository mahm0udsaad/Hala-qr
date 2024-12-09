"use dom";
import React from "react";
import { FontPicker } from "./FontPicker";
import { EffectsControls } from "./EffectsControls";

export function OptionsPopup({ element, updateElement, position }) {
  if (!element) return null;

  const handleFontChange = (font) => {
    updateElement(element.id, { fontFamily: font });
  };

  const handleFontSizeChange = (e) => {
    updateElement(element.id, { fontSize: parseInt(e.target.value) });
  };

  const handleColorChange = (e) => {
    updateElement(element.id, { color: e.target.value });
  };

  const handleEffectsChange = (effects) => {
    updateElement(element.id, {
      [element.type === "text" ? "textEffect" : "shapeEffect"]: effects,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "1rem",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Edit {element.type}</h3>

      {element.type === "text" && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Font
            </label>
            <FontPicker
              onSelect={handleFontChange}
              currentFont={element.fontFamily}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Font Size
            </label>
            <input
              type="range"
              min="8"
              max="72"
              value={element.fontSize}
              onChange={handleFontSizeChange}
              style={{ width: "100%" }}
            />
            <span>{element.fontSize}px</span>
          </div>
        </>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Color
        </label>
        <input
          type="color"
          value={element.color}
          onChange={handleColorChange}
          style={{ width: "100%", height: "2rem" }}
        />
      </div>

      <EffectsControls
        type={element.type}
        effects={
          element.type === "text"
            ? element.textEffect || {}
            : element.shapeEffect || {}
        }
        onChange={handleEffectsChange}
      />
    </div>
  );
}
