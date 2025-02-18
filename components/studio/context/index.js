import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const initialState = {
  designId: null,
  elements: [],
  selectedElement: null,
  canvasBackground: "#ffffff",
  backgroundImage: null,
  invitation: {
    details: {
      title: "",
      type: null,
      description: "",
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      location: "",
      hostedBy: "",
      hideGuestList: false,
    },
  },
  guests: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_DESIGN_ID":
      return {
        ...state,
        designId: action.payload,
      };
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
    case "SET_INVITATION_DETAILS":
      return {
        ...state,
        invitation: {
          ...state.invitation,
          details: {
            ...state.invitation.details,
            ...action.payload,
          },
        },
      };
    case "ADD_GUEST":
      return {
        ...state,
        guests: [...state.guests, action.payload],
      };
    case "REMOVE_GUEST":
      return {
        ...state,
        guests: state.guests.filter((guest) => guest.id !== action.payload),
      };
    default:
      return state;
  }
};

const StudioContext = createContext(null);

export const StudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addImage = useCallback((imageData) => {
    dispatch({ type: "ADD_IMAGE_ELEMENT", payload: imageData });
  }, []);

  const setBackgroundImage = useCallback((imageUrl) => {
    dispatch({ type: "SET_BACKGROUND_IMAGE", payload: imageUrl });
  }, []);

  const setInvitationDetails = useCallback((details) => {
    dispatch({ type: "SET_INVITATION_DETAILS", payload: details });
  }, []);

  const addGuest = useCallback((guest) => {
    dispatch({ type: "ADD_GUEST", payload: guest });
  }, []);

  const removeGuest = useCallback((guestId) => {
    dispatch({ type: "REMOVE_GUEST", payload: guestId });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      addImage,
      setBackgroundImage,
      setInvitationDetails,
      addGuest,
      removeGuest,
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

export default StudioContext;
