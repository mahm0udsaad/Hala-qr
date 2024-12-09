import { useReducer } from "react";

const initialState = {
  eventTitle: "",
  eventType: null,
  eventDescription: "",
  startDate: new Date(),
  startTime: new Date(),
  endDate: new Date(),
  endTime: new Date(),
  location: "",
  hostedBy: "",
  hideGuestList: false,
  isStartDatePickerVisible: false,
  isStartTimePickerVisible: false,
  isEndDatePickerVisible: false,
  isEndTimePickerVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENT_TITLE":
      return { ...state, eventTitle: action.payload };
    case "SET_EVENT_TYPE":
      return { ...state, eventType: action.payload };
    case "SET_EVENT_DESCRIPTION":
      return { ...state, eventDescription: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_START_TIME":
      return { ...state, startTime: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_END_TIME":
      return { ...state, endTime: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_HOSTED_BY":
      return { ...state, hostedBy: action.payload };
    case "TOGGLE_HIDE_GUEST_LIST":
      return { ...state, hideGuestList: !state.hideGuestList };
    case "SET_START_DATE_PICKER_VISIBILITY":
      return { ...state, isStartDatePickerVisible: action.payload };
    case "SET_START_TIME_PICKER_VISIBILITY":
      return { ...state, isStartTimePickerVisible: action.payload };
    case "SET_END_DATE_PICKER_VISIBILITY":
      return { ...state, isEndDatePickerVisible: action.payload };
    case "SET_END_TIME_PICKER_VISIBILITY":
      return { ...state, isEndTimePickerVisible: action.payload };
    default:
      return state;
  }
};

// Custom hook to handle the event form state
export const useEventForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (field, value) => {
    dispatch({ type: `SET_${field.toUpperCase()}`, payload: value });
  };

  const toggleField = (field) => {
    dispatch({ type: `TOGGLE_${field.toUpperCase()}` });
  };

  const setVisibility = (field, value) => {
    dispatch({
      type: `SET_${field.toUpperCase()}_PICKER_VISIBILITY`,
      payload: value,
    });
  };

  return {
    state,
    updateField,
    toggleField,
    setVisibility,
  };
};
