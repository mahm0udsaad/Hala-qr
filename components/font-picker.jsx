"use dom";
import React, { useState } from "react";

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

export default function FontPicker({ onSelect, currentFont }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "0.5rem",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {currentFont || "Select a font"}
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "200px",
            overflowY: "auto",
            background: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            borderRadius: "0 0 0.25rem 0.25rem",
            zIndex: 1,
          }}
        >
          {fonts.map((font) => (
            <button
              key={font}
              onClick={() => {
                onSelect(font);
                setIsOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.5rem",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: font,
              }}
            >
              {font}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
