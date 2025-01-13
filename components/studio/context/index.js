import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const initialState = {
  elements: [],
  selectedElement: null,
  canvasBackground: "#ffffff",
  backgroundImage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };

    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload.id
            ? { ...element, ...action.payload.updates }
            : element,
        ),
      };

    case "REMOVE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter(
          (element) => element.id !== action.payload,
        ),
      };

    case "UPDATE_POSITION":
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload.id
            ? { ...element, position: action.payload.position }
            : element,
        ),
      };

    case "UPDATE_CANVAS_BACKGROUND":
      return {
        ...state,
        canvasBackground: action.payload,
      };

    case "SET_BACKGROUND_IMAGE":
      return {
        ...state,
        backgroundImage: action.payload,
      };

    case "ADD_IMAGE_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };

    default:
      return state;
  }
};

const StudioContext = createContext(null);

export const StudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const addImage = useCallback((imageData) => {
    dispatch({ type: "ADD_IMAGE_ELEMENT", payload: imageData });
  }, []);

  const setBackgroundImage = useCallback((imageUrl) => {
    dispatch({ type: "SET_BACKGROUND_IMAGE", payload: imageUrl });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      addImage,
      setBackgroundImage,
    }),
    [state],
  );

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
};
