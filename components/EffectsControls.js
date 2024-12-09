"use dom";
import React from "react";

export function EffectsControls({ type, effects, onChange }) {
  const handleChange = (effect, value) => {
    onChange({ ...effects, [effect]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {type === "text" && (
        <>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Shadow
            </label>
            <input
              type="text"
              value={effects.shadow || ""}
              onChange={(e) => handleChange("shadow", e.target.value)}
              placeholder="e.g. 2px 2px 4px rgba(0,0,0,0.5)"
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Outline
            </label>
            <input
              type="text"
              value={effects.outline || ""}
              onChange={(e) => handleChange("outline", e.target.value)}
              placeholder="e.g. 2px solid black"
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        </>
      )}
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Gradient
        </label>
        <input
          type="text"
          value={effects.gradient || ""}
          onChange={(e) => handleChange("gradient", e.target.value)}
          placeholder="e.g. linear-gradient(to right, red, blue)"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      {type === "shape" && (
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Shadow
          </label>
          <input
            type="text"
            value={effects.shadow || ""}
            onChange={(e) => handleChange("shadow", e.target.value)}
            placeholder="e.g. 0 4px 6px rgba(0,0,0,0.1)"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
      )}
    </div>
  );
}
