"use dom";
export default function EffectsControls({ type, effects, onChange }) {
  const handleChange = (effect, value) => {
    onChange({ ...effects, [effect]: value });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {type === "text" && (
        <>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Shadow
            </label>
            <input
              type="checkbox"
              checked={!!effects.shadow}
              onChange={(e) =>
                handleChange(
                  "shadow",
                  e.target.checked ? "2px 2px 4px rgba(0,0,0,0.5)" : undefined,
                )
              }
            />
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Outline
            </label>
            <input
              type="checkbox"
              checked={!!effects.outline}
              onChange={(e) =>
                handleChange(
                  "outline",
                  e.target.checked ? "1px solid black" : undefined,
                )
              }
            />
          </div>
        </>
      )}
      {type === "shape" && (
        <div style={{ marginBottom: "0.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Shadow
          </label>
          <input
            type="checkbox"
            checked={!!effects.shadow}
            onChange={(e) =>
              handleChange(
                "shadow",
                e.target.checked ? "0 4px 6px rgba(0,0,0,0.1)" : undefined,
              )
            }
          />
        </div>
      )}
    </div>
  );
}
