import React, { createContext, useReducer, useContext } from "react";

// Action Types
const ADD_TEXT = "ADD_TEXT";
const UPDATE_TEXT = "UPDATE_TEXT";
const DELETE_TEXT = "DELETE_TEXT";
const ADD_SHAPE = "ADD_SHAPE";
const UPDATE_SHAPE = "UPDATE_SHAPE";
const DELETE_SHAPE = "DELETE_SHAPE";
const SET_CANVAS_BACKGROUND = "SET_CANVAS_BACKGROUND";
const SET_BACKGROUND_IMAGE = "SET_BACKGROUND_IMAGE";
const UPDATE_ELEMENT_POSITION = "UPDATE_ELEMENT_POSITION";
const TOGGLE_ELEMENT_CONTROLS = "TOGGLE_ELEMENT_CONTROLS";
const CUSTOMIZE_SHAPE = "CUSTOMIZE_SHAPE";
const UPDATE_SHAPE_SIZE = "UPDATE_SHAPE_SIZE";
// Add new action types
const SET_INVITATION_DETAILS = "SET_INVITATION_DETAILS";
const SET_INVITATION_IMAGE = "SET_INVITATION_IMAGE";
const ADD_CONTACT = "ADD_CONTACT";
const REMOVE_CONTACT = "REMOVE_CONTACT";

// Updated initial state
const initialState = {
  textElements: [],
  shapeElements: [],
  canvasBackground: "white",
  backgroundImage: null,
  invitation: {
    image: null,
    details: {
      title: "",
      type: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      hostedBy: "",
      hideGuestList: false,
    },
    contacts: [],
  },
};

// Reducer
const studioReducer = (state, action) => {
  switch (action.type) {
    case ADD_TEXT:
      return {
        ...state,
        textElements: [
          ...state.textElements,
          {
            id: Date.now(),
            content: "New Text",
            textColor: "#000000",
            backgroundColor: "rgba(30, 58, 138, 0.1)",
            fontSize: 16,
            fontWeight: "400",
            fontFamily: "system",
            x: action.payload?.x || 100,
            y: action.payload?.y || 100,
            showControls: false,
            ...action.payload,
          },
        ],
      };

    case UPDATE_SHAPE_SIZE:
      return {
        ...state,
        shapeElements: state.shapeElements.map((shape) =>
          shape.id === action.payload.id
            ? {
                ...shape,
                size: action.payload.size,
              }
            : shape,
        ),
      };

    case UPDATE_TEXT:
      return {
        ...state,
        textElements: state.textElements.map((text) =>
          text.id === action.payload.id
            ? { ...text, ...action.payload.updates }
            : text,
        ),
      };

    case DELETE_TEXT:
      return {
        ...state,
        textElements: state.textElements.filter(
          (text) => text.id !== action.payload,
        ),
      };

    case ADD_SHAPE:
      return {
        ...state,
        shapeElements: [
          ...state.shapeElements,
          {
            id: Date.now(),
            type: action.payload.type,
            color: action.payload.color || "#1E3A8A",
            x: action.payload?.x || 100,
            y: action.payload?.y || 100,
            size: action.payload?.size || 100,
            showControls: false,
            ...action.payload,
          },
        ],
      };

    case CUSTOMIZE_SHAPE:
      return {
        ...state,
        shapeElements: state.shapeElements.map((shape) =>
          shape.id === action.payload.id
            ? {
                ...shape,
                color: action.payload.color,
                borderRadius: action.payload.borderRadius,
                shadowType: action.payload.shadowType,
                isFilled: action.payload.isFilled,
              }
            : shape,
        ),
      };

    case UPDATE_SHAPE:
      return {
        ...state,
        shapeElements: state.shapeElements.map((shape) =>
          shape.id === action.payload.id
            ? { ...shape, ...action.payload.updates }
            : shape,
        ),
      };

    case DELETE_SHAPE:
      return {
        ...state,
        shapeElements: state.shapeElements.filter(
          (shape) => shape.id !== action.payload,
        ),
      };

    case SET_CANVAS_BACKGROUND:
      return {
        ...state,
        canvasBackground: action.payload,
      };

    case SET_BACKGROUND_IMAGE:
      return {
        ...state,
        backgroundImage: action.payload,
      };

    case UPDATE_ELEMENT_POSITION:
      const { elementType, id, x, y } = action.payload;
      return {
        ...state,
        [elementType]: state[elementType].map((element) =>
          element.id === id ? { ...element, x, y } : element,
        ),
      };

    case TOGGLE_ELEMENT_CONTROLS:
      const { elementType: toggleType, id: toggleId } = action.payload;

      // If toggleId is null, hide controls for all elements
      if (toggleId === null) {
        return {
          ...state,
          textElements: state.textElements.map((element) => ({
            ...element,
            showControls: false,
          })),
          shapeElements: state.shapeElements.map((element) => ({
            ...element,
            showControls: false,
          })),
        };
      }

      return {
        ...state,
        [toggleType]: state[toggleType].map((element) =>
          element.id === toggleId
            ? { ...element, showControls: !element.showControls }
            : { ...element, showControls: false },
        ),
      };
    case SET_INVITATION_DETAILS:
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

    case SET_INVITATION_IMAGE:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          image: action.payload,
        },
      };

    case ADD_CONTACT:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          contacts: [...state.invitation.contacts, action.payload],
        },
      };

    case REMOVE_CONTACT:
      return {
        ...state,
        invitation: {
          ...state.invitation,
          contacts: state.invitation.contacts.filter(
            (contact) => contact.id !== action.payload,
          ),
        },
      };

    default:
      return state;
  }
};

const StudioContext = createContext();

export const StudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studioReducer, initialState);

  const addText = (textData) =>
    dispatch({
      type: ADD_TEXT,
      payload: textData,
    });

  const updateText = (id, updates) =>
    dispatch({
      type: UPDATE_TEXT,
      payload: { id, updates },
    });

  const deleteText = (id) =>
    dispatch({
      type: DELETE_TEXT,
      payload: id,
    });

  const addShape = (shapeData) =>
    dispatch({
      type: ADD_SHAPE,
      payload: shapeData,
    });

  const updateShape = (id, updates) =>
    dispatch({
      type: UPDATE_SHAPE,
      payload: { id, updates },
    });

  const deleteShape = (id) =>
    dispatch({
      type: DELETE_SHAPE,
      payload: id,
    });

  const setCanvasBackground = (color) =>
    dispatch({
      type: SET_CANVAS_BACKGROUND,
      payload: color,
    });

  const setBackgroundImage = (image) =>
    dispatch({
      type: SET_BACKGROUND_IMAGE,
      payload: image,
    });

  const customizeShape = (
    id,
    color,
    strokeWidth,
    isFilled,
    borderRadius,
    shadowType,
  ) =>
    dispatch({
      type: CUSTOMIZE_SHAPE,
      payload: { id, color, strokeWidth, isFilled, borderRadius, shadowType },
    });

  const updateElementPosition = (type, id, x, y) =>
    dispatch({
      type: UPDATE_ELEMENT_POSITION,
      payload: {
        elementType: `${type}Elements`,
        id,
        x,
        y,
      },
    });

  const updateShapeSize = (id, size) =>
    dispatch({
      type: UPDATE_SHAPE_SIZE,
      payload: { id, size },
    });

  const toggleElementControls = (type, id) =>
    dispatch({
      type: TOGGLE_ELEMENT_CONTROLS,
      payload: {
        elementType: `${type}Elements`,
        id,
      },
    });

  const hideAllElementControls = () =>
    dispatch({
      type: TOGGLE_ELEMENT_CONTROLS,
      payload: {
        elementType: "allElements",
        id: null,
      },
    });

  const setInvitationDetails = (details) =>
    dispatch({
      type: SET_INVITATION_DETAILS,
      payload: details,
    });

  const setInvitationImage = (image) =>
    dispatch({
      type: SET_INVITATION_IMAGE,
      payload: image,
    });

  const addContact = (contact) =>
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });

  const removeContact = (contactId) =>
    dispatch({
      type: REMOVE_CONTACT,
      payload: contactId,
    });

  return (
    <StudioContext.Provider
      value={{
        state,
        addText,
        updateText,
        deleteText,
        addShape,
        updateShape,
        deleteShape,
        setCanvasBackground,
        setBackgroundImage,
        updateElementPosition,
        toggleElementControls,
        hideAllElementControls,
        customizeShape,
        updateShapeSize,
        setInvitationDetails,
        setInvitationImage,
        addContact,
        removeContact,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

// Custom Hook for using Studio Context
export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
};
