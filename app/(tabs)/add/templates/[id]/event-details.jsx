import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Link, useLocalSearchParams } from "expo-router";
import { useStudio } from "../../../../../context";

const EventDetailsForm = () => {
  const { state, setInvitationDetails } = useStudio();
  const { id } = useLocalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState({
    start_date: false,
    start_time: false,
    end_date: false,
    end_time: false,
  });
  const [open, setOpen] = useState(false);
  const [zIndex, setZIndex] = useState(0);

  const showPicker = (pickerType) => {
    setShowDatePicker((prev) => ({ ...prev, [pickerType]: true }));
  };

  const hidePicker = (pickerType) => {
    setShowDatePicker((prev) => ({ ...prev, [pickerType]: false }));
  };

  const getInitialDate = (dateField) => {
    const date = state.invitation.details[dateField];
    return date ? new Date(date) : new Date();
  };

  const handleConfirmDate = (event, date, fieldType, hidePickerType) => {
    if (date) {
      setInvitationDetails({
        [fieldType]: date.toISOString(),
      });
      hidePicker(hidePickerType);
    }
  };

  const updateField = (field, value) => {
    console.log(field, value);

    setInvitationDetails({
      [field]: value,
    });
  };

  const toggleHideGuestList = () => {
    setInvitationDetails({
      hideGuestList: !state.invitation.details.hideGuestList,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Event Title</Text>
        <TextInput
          value={state.invitation.details.title}
          onChangeText={(text) => updateField("title", text)}
          placeholder="Enter event title"
          style={styles.input}
        />

        <View style={[styles.dropdownSection, { zIndex: 1000 }]}>
          <Text style={styles.sectionTitle}>Event Type</Text>
          <DropDownPicker
            open={open}
            value={state.invitation.details.type}
            items={[
              { label: "Conference", value: "conference" },
              { label: "Webinar", value: "webinar" },
              { label: "Workshop", value: "workshop" },
            ]}
            setOpen={(isOpen) => {
              setOpen(isOpen);
              setZIndex(isOpen ? 1000 : 0);
            }}
            setValue={(callback) => {
              const value = callback(state.invitation.details.type);
              updateField("type", value);
            }}
            placeholder="Select event type"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
          />
        </View>

        <View style={[styles.formSection, { zIndex: zIndex ? -1 : 0 }]}>
          <Text style={styles.sectionTitle}>Event Description</Text>
          <TextInput
            value={state.invitation.details.description}
            onChangeText={(text) => updateField("description", text)}
            placeholder="Write your event description"
            multiline
            numberOfLines={4}
            style={styles.multilineInput}
          />

          <Text style={styles.sectionTitle}>Event Timing</Text>
          <View style={styles.dateTimeContainer}>
            <Pressable
              style={styles.dateTimePressable}
              onPress={() => showPicker("start_date")}
            >
              <Text style={styles.dateTimeText}>
                {state.invitation.details.startDate
                  ? new Date(
                      state.invitation.details.startDate,
                    ).toLocaleDateString()
                  : "Select date"}
              </Text>
            </Pressable>
            {showDatePicker.start_date && (
              <DateTimePicker
                value={getInitialDate("startDate")}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleConfirmDate(event, date, "startDate", "start_date")
                }
              />
            )}
            <Pressable
              style={styles.dateTimePressable}
              onPress={() => showPicker("start_time")}
            >
              <Text style={styles.dateTimeText}>
                {state.invitation.details.startTime
                  ? new Date(
                      state.invitation.details.startTime,
                    ).toLocaleTimeString()
                  : "Select time"}
              </Text>
            </Pressable>
            {showDatePicker.start_time && (
              <DateTimePicker
                value={getInitialDate("startTime")}
                mode="time"
                display="default"
                onChange={(event, date) =>
                  handleConfirmDate(event, date, "startTime", "start_time")
                }
              />
            )}
          </View>

          <View style={styles.dateTimeContainer}>
            <Pressable
              style={styles.dateTimePressable}
              onPress={() => showPicker("end_date")}
            >
              <Text style={styles.dateTimeText}>
                {state.invitation.details.endDate
                  ? new Date(
                      state.invitation.details.endDate,
                    ).toLocaleDateString()
                  : "Select date"}
              </Text>
            </Pressable>
            {showDatePicker.end_date && (
              <DateTimePicker
                value={getInitialDate("endDate")}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleConfirmDate(event, date, "endDate", "end_date")
                }
              />
            )}
            <Pressable
              style={styles.dateTimePressable}
              onPress={() => showPicker("end_time")}
            >
              <Text style={styles.dateTimeText}>
                {state.invitation.details.endTime
                  ? new Date(
                      state.invitation.details.endTime,
                    ).toLocaleTimeString()
                  : "Select time"}
              </Text>
            </Pressable>
            {showDatePicker.end_time && (
              <DateTimePicker
                value={getInitialDate("endTime")}
                mode="time"
                display="default"
                onChange={(event, date) =>
                  handleConfirmDate(event, date, "endTime", "end_time")
                }
              />
            )}
          </View>

          <Text style={styles.sectionTitle}>Location</Text>
          <TextInput
            value={state.invitation.details.location}
            onChangeText={(text) => updateField("location", text)}
            placeholder="Location"
            style={styles.input}
          />

          <Text style={styles.sectionTitle}>Hosted By</Text>
          <TextInput
            value={state.invitation.details.hostedBy}
            onChangeText={(text) => updateField("hostedBy", text)}
            placeholder="Enter host name"
            style={styles.input}
          />

          <View style={styles.guestOptionsContainer}>
            <Text style={styles.sectionTitle}>Guest Options</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                Hide the guest list from attendees for this event
              </Text>
              <Switch
                value={state.invitation.details.hideGuestList}
                onValueChange={toggleHideGuestList}
              />
            </View>
          </View>

          <View style={styles.nextButtonContainer}>
            <Link
              style={styles.nextButton}
              href={{
                pathname: `/add/templates/[id]/event-preview`,
                params: { id: "new" },
              }}
            >
              <Text style={styles.nextButtonText}>Next: Preview</Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  dropdownSection: {
    marginBottom: 16,
  },
  formSection: {
    position: "relative",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 100,
  },
  dropdown: {
    borderColor: "#D1D5DB",
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateTimePressable: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    width: "48%",
  },
  dateTimeText: {
    color: "#6B7280",
  },
  guestOptionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    marginRight: 8,
    color: "#4B5563",
    flex: 1,
  },
  nextButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  nextButton: {
    backgroundColor: "#1E40AF",
    padding: 16,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default EventDetailsForm;
