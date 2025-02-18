import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStudio } from "../../../../../components/studio/context";
import EventDetailsHeader from "../../../../../components/studio/components/event-details-header";

const PreviewScreen = () => {
  const { state } = useStudio();
  const { details } = state.invitation;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusIndicator = (status) => {
    switch (status) {
      case "going":
        return {
          color: styles.goingStatus,
          label: "Going",
        };
      case "not_going":
        return {
          color: styles.notGoingStatus,
          label: "Not Going",
        };
      case "waiting":
        return {
          color: styles.waitingStatus,
          label: "Waiting",
        };
      default:
        return {
          color: styles.unknownStatus,
          label: "Unknown",
        };
    }
  };

  return (
    <>
      <EventDetailsHeader />
      <ScrollView style={styles.container}>
        {/* Event Banner */}
        <View style={styles.bannerContainer}>
          <Image
            src={state.backgroundImage}
            style={styles.bannerImage}
            resizeMode="contain"
          />

          <Link
            href={{
              pathname: "/add/templates/[id]/event-details",
              params: { id: "current" },
            }}
            asChild
          >
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Details</Text>
            </Pressable>
          </Link>
        </View>

        {/* Event Details */}
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventTitle}>
            {details.title || "Untitled Event"}
          </Text>

          {/* Date and Time */}
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              📅 {formatDate(details.startDate)}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>
              ⏰ {formatTime(details.startTime)} – {formatTime(details.endTime)}
            </Text>
          </View>
          <Text style={styles.addToCalendarText}>+ Add to Calendar</Text>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              📍 {details.location || "Location not specified"}
            </Text>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <Image
              source={{
                uri: "https://i.sstatic.net/HILmr.png",
              }}
              style={styles.mapImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Hosted By */}
        <View style={styles.hostedByContainer}>
          <Text style={styles.sectionTitle}>Hosted By</Text>
          <Text style={styles.hostedByText}>
            {details.hostedBy || "Not specified"}
          </Text>
        </View>

        {/* Event Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Event Description</Text>
          <Text style={styles.descriptionText}>
            {details.description || "No description provided"}
          </Text>
        </View>

        {/* Guest List */}
        {!details.hideGuestList && (
          <View style={styles.guestListContainer}>
            <View style={styles.addContactButtonContainer}>
              <Link
                href={{
                  pathname: "/add/templates/[id]/add-contacts",
                  params: { id: "current" },
                }}
                style={styles.addContactButton}
              >
                <Ionicons name="person-add-outline" size={20} color="#009CDE" />
              </Link>
            </View>
            <Text style={styles.sectionTitle}>Guest List</Text>

            {(state.guests || []).map((contact) => {
              const { color, label } = getStatusIndicator(contact.status);
              return (
                <View key={contact.id} style={styles.contactItemContainer}>
                  <View style={styles.contactInfoContainer}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarText}>
                        {contact.avatar ||
                          contact.name.slice(0, 2).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactPhone}>{contact.phone}</Text>
                    </View>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={color}>{label}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bannerContainer: {
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 384,
  },
  editButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FACC15",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  editButtonText: {
    color: "black",
  },
  eventDetailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  dateTimeText: {
    color: "#4B5563",
  },
  addToCalendarText: {
    color: "#3B82F6",
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    color: "#4B5563",
  },
  mapContainer: {
    width: "100%",
    height: 192,
    marginTop: 16,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  hostedByContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontWeight: "600",
  },
  hostedByText: {
    color: "#4B5563",
  },
  descriptionText: {
    color: "#4B5563",
  },
  guestListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addContactButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addContactButton: {
    marginBottom: 8,
    backgroundColor: "#22A7E8",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#009CDE",
    borderRadius: 8,
    opacity: 0.4,
  },
  contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  contactInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "#D1D5DB",
    borderRadius: 9999,
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontWeight: "600",
  },
  contactName: {
    color: "#1F2937",
    fontWeight: "500",
  },
  contactPhone: {
    color: "#6B7280",
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  goingStatus: {
    color: "#10B981",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  notGoingStatus: {
    color: "#EF4444",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  waitingStatus: {
    color: "#EAB308",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unknownStatus: {
    color: "#6B7280",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default PreviewScreen;
