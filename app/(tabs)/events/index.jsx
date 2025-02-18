import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { noEventsIconXml } from "@/assets/svg/icons";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../context/index";

const Events = () => {
  const { t } = useTranslation();
  const { token } = useUser();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});

  // Get current date dynamically
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/events/index",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();

      if (responseData.status && responseData.data.events) {
        setEvents(responseData.data.events);

        // Mark dates with events and current date
        const eventDates = responseData.data.events.reduce((acc, event) => {
          acc[event.start_date] = {
            marked: true,
            dotColor: "#FFDA78",
          };
          return acc;
        }, {});

        // Add current date marking
        const currentDate = getCurrentDate();
        eventDates[currentDate] = {
          ...eventDates[currentDate],
          selected: true,
          selectedColor: "#172554",
        };

        setMarkedDates(eventDates);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <Image
        source={{ uri: item.design.image }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.eventDate}>
          {item.start_date} | {item.start_time}
        </Text>
      </View>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <View>{/* Loading state */}</View>;
    }

    if (events.length === 0) {
      return (
        <View style={styles.noEventsCard}>
          <View style={styles.noEventsIconContainer}>
            <SvgXml xml={noEventsIconXml} width={120} height={120} />
          </View>
          <View style={styles.noEventsTextContainer}>
            <Text style={styles.noEventsTitle}>{t("noEvents")}</Text>
            <Text style={styles.noEventsSubtext}>{t("noEventsText")}</Text>
          </View>
        </View>
      );
    }

    return (
      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.eventsList}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarWrapper}>
                <Calendar
                  current={getCurrentDate()}
                  markedDates={markedDates}
                  onDayPress={(day) => console.log("selected day", day)}
                  monthFormat={"MMMM yyyy"}
                  onMonthChange={(month) => console.log("month changed", month)}
                  hideArrows={false}
                  hideExtraDays={false}
                  disableMonthChange={false}
                  firstDay={0}
                  hideDayNames={false}
                  showWeekNumbers={false}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  enableSwipeMonths={true}
                  theme={{
                    backgroundColor: "#DDE3FF",
                    calendarBackground: "#DDE3FF",
                    textSectionTitleColor: "#64748b",
                    selectedDayBackgroundColor: "#172554",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#172554",
                    dayTextColor: "#1e293b",
                    textDisabledColor: "#94a3b8",
                    dotColor: "#FFDA78",
                    selectedDotColor: "#FFDA78",
                    arrowColor: "#172554",
                    monthTextColor: "#172554",
                    indicatorColor: "#FFDA78",
                    textDayFontFamily: "System",
                    textMonthFontFamily: "System",
                    textDayHeaderFontFamily: "System",
                    textDayFontWeight: "400",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "400",
                    textDayFontSize: 12,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 12,
                  }}
                />
              </View>
            </View>

            <View style={styles.eventsContainer}>
              <Text style={styles.sectionTitle}>{t("events")}</Text>
            </View>
          </>
        }
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderContent()}
        contentContainerStyle={styles.eventsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginBottom: 28,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  calendarWrapper: {
    backgroundColor: "#DDE3FF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: "hidden",
  },
  eventsContainer: {
    width: "91.666667%",
    marginHorizontal: "auto",
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8,
  },
  noEventsCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#DDE3FF",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noEventsIconContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  noEventsTextContainer: {
    flex: 1,
  },
  noEventsTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8,
  },
  noEventsSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#DDE3FF",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: "#172554",
  },
  eventsList: {
    paddingBottom: 16,
  },
});

export default Events;
