import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useUser } from "../../../context";
import { useStudio } from "../context";
import { EventSuccessModal } from "../../cards/event-success";

const EventDetailsHeader = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { state } = useStudio();
  const { details } = state.invitation;
  const { token } = useUser();
  const router = useRouter();

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmitEvent = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add event details with properly formatted dates
      formData.append("title", details.title || "");
      formData.append("design_id", state.designId || "2");
      formData.append("category_id", "1");
      formData.append("description", details.description || "");
      formData.append("start_date", formatDate(details.startDate));
      formData.append("start_time", formatTime(details.startTime));
      formData.append("end_date", formatDate(details.endDate));
      formData.append("end_time", formatTime(details.endTime));
      formData.append("latitude", "40.123123");
      formData.append("longitude", "40.123123");
      formData.append("hosted_by", details.hostedBy || "");
      formData.append("hide_guest_list", details.hideGuestList ? "1" : "0");
      formData.append("is_public", "1");

      if (state.guests && state.guests.length > 0) {
        state.guests.forEach((guest, index) => {
          const formattedPhone = guest.phone
            ? guest.phone.replace(/\D/g, "").replace(/^0/, "")
            : "";

          formData.append(`guests[${index}][name]`, guest.name || "");
          formData.append(`guests[${index}][mobile]`, formattedPhone);
        });
      }

      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/events/store",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Error in verification!");
      }

      if (responseData.status) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/events");
        }, 2000);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
      console.error("Event creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    return (
      details.title &&
      details.startDate &&
      details.startTime &&
      details.endDate &&
      details.endTime &&
      details.hostedBy
    );
  };

  return (
    <View style={styles.header}>
      <EventSuccessModal
        visible={showSuccessModal}
        eventTitle={details.title}
      />

      <Link href="/add/templates" style={styles.backButton}>
        <ArrowLeft size={24} color="#FFDA78" />
      </Link>

      <Text style={styles.headerTitle}>Create Event</Text>

      <TouchableOpacity
        style={[
          styles.saveButton,
          (!validateForm() || isSubmitting) && styles.saveButtonDisabled,
        ]}
        onPress={handleSubmitEvent}
        disabled={!validateForm() || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFDA78" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003B95",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    color: "#FFDA78",
    fontSize: 20,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFDA78",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#FFDA78",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EventDetailsHeader;
