import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { noEventsIconXml } from "@/assets/svg/icons";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

const Events = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.calendarContainer}>
        <View style={styles.calendarWrapper}>
          <Calendar
            current={"2024-01-01"}
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
              dotColor: "#172554",
              selectedDotColor: "#ffffff",
              arrowColor: "#172554",
              monthTextColor: "#172554",
              indicatorColor: "#172554",
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
        <Text style={styles.sectionTitle}>{t("thisMonth")}</Text>
        <View style={styles.noEventsCard}>
          <View style={styles.noEventsIconContainer}>
            <SvgXml xml={noEventsIconXml} width={120} height={120} />
          </View>
          <View style={styles.noEventsTextContainer}>
            <Text style={styles.noEventsTitle}>{t("noEvents")}</Text>
            <Text style={styles.noEventsSubtext}>{t("noEventsText")}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  calendarContainer: {
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
});

export default Events;
