// CanvasContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [background, setBackground] = useState({
    type: "color",
    value: "#ffffff",
  });

  const addElement = useCallback((element) => {
    setElements((prev) => [
      ...prev,
      { ...element, id: Math.random().toString() },
    ]);
  }, []);

  const updateElement = useCallback((id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    );
  }, []);

  const removeElement = useCallback((id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        elements,
        selectedId,
        background,
        setSelectedId,
        setBackground,
        addElement,
        updateElement,
        removeElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider");
  }
  return context;
};
