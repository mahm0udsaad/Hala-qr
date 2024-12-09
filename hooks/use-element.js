import { useState, useRef, useCallback } from "react";
export default function useElements() {
  const [elements, setElements] = useState([]);
  const [activeElement, setActiveElement] = useState(null);
  const elementsRef = useRef(elements);

  const addElement = useCallback(
    (type, content, position, shapeType) => {
      const newElement = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content,
        x: position.x,
        y: position.y,
        width: 100,
        height: type === "shape" ? 100 : 40,
        color: "#000000",
        fontSize: 16,
        fontFamily: "Arial",
        zIndex: elements.length,
        ...(shapeType && { shapeType }),
        ...(type === "text" && { textEffect: {} }),
        ...(type === "shape" && { shapeEffect: {} }),
      };
      setElements((prev) => {
        const updated = [...prev, newElement];
        elementsRef.current = updated;
        return updated;
      });
      return newElement.id;
    },
    [elements.length],
  );

  const updateElement = useCallback((id, updates) => {
    setElements((prev) => {
      const updated = prev.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      );
      elementsRef.current = updated;
      return updated;
    });
  }, []);

  const deleteElement = useCallback((id) => {
    setElements((prev) => {
      const updated = prev.filter((el) => el.id !== id);
      elementsRef.current = updated;
      return updated;
    });
  }, []);

  const toggleEditMode = useCallback((id) => {
    setElements((prev) => {
      const updated = prev.map((el) =>
        el.id === id ? { ...el, isEditing: !el.isEditing } : el,
      );
      elementsRef.current = updated;
      return updated;
    });
  }, []);

  return {
    elements,
    elementsRef,
    activeElement,
    setActiveElement,
    addElement,
    updateElement,
    deleteElement,
    toggleEditMode,
  };
}
