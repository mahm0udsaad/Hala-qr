import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function NotificationsScreen() {
  const [rsvpNotification, setRsvpNotification] = useState(true);
  const [activityNotification, setActivityNotification] = useState(true);

  const notifications = [
    {
      title: "Receive notification when guests RSVP to the event",
      subtitle: "",
    },
    {
      title: "Receive notification for activity that involves me",
      subtitle: "When a guest replies to me, mentions, or tags me",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Notification Options */}
      <View style={styles.optionsContainer}>
        {notifications.map(({ title, subtitle }, index) => (
          <View key={index} style={styles.option}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
              ) : null}
            </View>

            <Switch
              value={index === 0 ? rsvpNotification : activityNotification}
              onValueChange={
                index === 0 ? setRsvpNotification : setActivityNotification
              }
              thumbColor={
                (index === 0 ? rsvpNotification : activityNotification)
                  ? "#FFF"
                  : "#f4f3f4"
              }
              trackColor={{ false: "#767577", true: "#007BFF" }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Tailwind's `bg-white`
  },
  optionsContainer: {
    width: "91.6667%", // Tailwind's `w-11/12`
    alignSelf: "center", // Tailwind's `mx-auto`
    padding: 16, // Tailwind's `p-4`
  },
  option: {
    flexDirection: "row", // Tailwind's `flex-row`
    justifyContent: "space-between", // Tailwind's `justify-between`
    alignItems: "center", // Tailwind's `items-center`
    paddingVertical: 8, // Tailwind's `py-2`
  },
  textContainer: {
    width: "80%", // Tailwind's `w-[80%]`
  },
  title: {
    color: "#000000", // Tailwind's `text-black`
    fontSize: 18, // Tailwind's `text-lg`
  },
  subtitle: {
    color: "#6B7280", // Tailwind's `text-gray-500`
  },
});
