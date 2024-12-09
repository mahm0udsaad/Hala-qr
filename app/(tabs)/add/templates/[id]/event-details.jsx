import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Link, useLocalSearchParams } from "expo-router";
import { useEventForm } from "@/hooks/use-event-form";

const EventDetailsForm = () => {
  const { state, updateField, toggleField, setVisibility } = useEventForm();
  const { id } = useLocalSearchParams();

  const [showDatePicker, setShowDatePicker] = useState({
    start_date: false,
    start_time: false,
    end_date: false,
    end_time: false,
  });

  const showPicker = (pickerType) => {
    setShowDatePicker((prev) => ({ ...prev, [pickerType]: true }));
  };

  const hidePicker = (pickerType) => {
    setShowDatePicker((prev) => ({ ...prev, [pickerType]: false }));
  };

  const handleConfirmDate = (event, date, setFunctionType, hidePickerType) => {
    if (date) {
      updateField(setFunctionType, date);
      hidePicker(hidePickerType);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Event Title</Text>
        <TextInput
          value={state.eventTitle}
          onChangeText={(text) => updateField("event_title", text)}
          placeholder="Enter event title"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Event Type</Text>
        <DropDownPicker
          open={state.eventType !== null}
          value={state.eventType}
          items={[
            { label: "Conference", value: "conference" },
            { label: "Webinar", value: "webinar" },
            { label: "Workshop", value: "workshop" },
          ]}
          setOpen={() => {}}
          setValue={(value) => updateField("event_type", value)}
          placeholder="Select event type"
          containerStyle={styles.dropdownContainer}
        />

        <Text style={styles.sectionTitle}>Event Description</Text>
        <TextInput
          value={state.eventDescription}
          onChangeText={(text) => updateField("event_description", text)}
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
              {state.startDate
                ? state.startDate.toLocaleDateString()
                : "Select date"}
            </Text>
          </Pressable>
          {showDatePicker.start_date && (
            <DateTimePicker
              value={state.startDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleConfirmDate(event, date, "start_date", "start_date")
              }
            />
          )}
          <Pressable
            style={styles.dateTimePressable}
            onPress={() => showPicker("start_time")}
          >
            <Text style={styles.dateTimeText}>
              {state.startTime
                ? state.startTime.toLocaleTimeString()
                : "Select time"}
            </Text>
          </Pressable>
          {showDatePicker.start_time && (
            <DateTimePicker
              value={state.startTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, date) =>
                handleConfirmDate(event, date, "start_time", "start_time")
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
              {state.endDate
                ? state.endDate.toLocaleDateString()
                : "Select date"}
            </Text>
          </Pressable>
          {showDatePicker.end_date && (
            <DateTimePicker
              value={state.endDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handleConfirmDate(event, date, "end_date", "end_date")
              }
            />
          )}
          <Pressable
            style={styles.dateTimePressable}
            onPress={() => showPicker("end_time")}
          >
            <Text style={styles.dateTimeText}>
              {state.endTime
                ? state.endTime.toLocaleTimeString()
                : "Select time"}
            </Text>
          </Pressable>
          {showDatePicker.end_time && (
            <DateTimePicker
              value={state.endTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, date) =>
                handleConfirmDate(event, date, "end_time", "end_time")
              }
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          value={state.location}
          onChangeText={(text) => updateField("location", text)}
          placeholder="Location"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Hosted By</Text>
        <TextInput
          value={state.hostedBy}
          onChangeText={(text) => updateField("hosted_by", text)}
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
              value={state.hideGuestList}
              onValueChange={() => toggleField("hide_guest_list")}
            />
          </View>
        </View>

        <View style={styles.nextButtonContainer}>
          <Link
            style={styles.nextButton}
            href={{
              pathname: `/add/templates/[id]/event-preview`,
              params: { id: id },
            }}
          >
            <Text style={styles.nextButtonText}>Next: Preview</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
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
