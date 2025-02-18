import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/linearGradient";
import { Link } from "expo-router";
import { Canvas, ImageSVG } from "@shopify/react-native-skia";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context";
import { invitationIconXml, noEventsIconXml } from "../../assets/svg/icons";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { user, token } = useUser();
  const userName = user?.f_name;
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // Fetch events
      const eventsResponse = await fetch(
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
      const eventsData = await eventsResponse.json();

      // Fetch invitations
      const invitationsResponse = await fetch(
        "https://hala-qr.jmintel.net/api/v1/invitations/index",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const invitationsData = await invitationsResponse.json();

      // Update state
      if (eventsData.status && eventsData.data.events) {
        setEvents(eventsData.data.events);
      }

      if (invitationsData.status && invitationsData.data.invitations) {
        setInvitations(invitationsData.data.invitations);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const renderInvitationsContent = () => {
    if (isLoading) return null;

    if (invitations.length === 0) {
      return (
        <View style={styles.invitationsCard}>
          <View style={styles.iconContainer}>
            <Canvas style={styles.canvas}>
              <ImageSVG
                svg={invitationIconXml}
                x={0}
                y={0}
                width={20}
                height={20}
              />
            </Canvas>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{t("noInvitations")}</Text>
            <Text style={styles.cardSubtext}>{t("noInvitationsText")}</Text>
          </View>
        </View>
      );
    }

    // Render invitations if available
    return invitations.map((invitation) => (
      <View key={invitation.id} style={styles.invitationsCard}>
        <Image
          source={{ uri: invitation.design.image }}
          style={styles.invitationImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{invitation.title}</Text>
          <Text style={styles.cardSubtext}>{invitation.description}</Text>
        </View>
      </View>
    ));
  };

  const renderEventsContent = () => {
    if (isLoading) return null;

    if (events.length === 0) {
      return (
        <View style={styles.eventsCard}>
          <View style={styles.iconContainer}>
            <Canvas style={styles.canvas}>
              <ImageSVG
                svg={noEventsIconXml}
                x={0}
                y={0}
                width={20}
                height={20}
              />
            </Canvas>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{t("noEvents")}</Text>
            <Text style={styles.cardSubtext}>{t("noEventsText")}</Text>
          </View>
        </View>
      );
    }

    // Render events if available
    return events.map((event) => (
      <View key={event.id} style={styles.eventsCard}>
        <Image source={{ uri: event.design.image }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
          <Text style={styles.cardSubtext}>
            {event.start_date} | {event.start_time}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <GradientBackground>
      <ScrollView>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
              {t("helloUser", { name: userName })}
            </Text>

            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatarImage}
                accessibilityLabel="User Avatar"
              />
            ) : (
              <Link href="/authModal" style={styles.signInLink}>
                <Text style={styles.signInText}>{t("signIn")}</Text>
              </Link>
            )}
          </View>

          <View style={styles.eventPlannerCard}>
            <Text style={styles.cardText}>{t("allSet")}</Text>
            <Text style={styles.cardSubtext}>{t("extraordinaryEvents")}</Text>
            <TouchableOpacity style={styles.planEventButton}>
              <Text style={styles.planEventButtonText}>{t("planEvent")}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>{t("invitations")}</Text>
          {renderInvitationsContent()}

          <Text style={styles.sectionTitle}>{t("upcomingEvents")}</Text>
          {renderEventsContent()}
        </SafeAreaView>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  invitationImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  eventImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  safeArea: {
    flex: 1,
    paddingVertical: 24,
    marginHorizontal: "auto",
    width: "91.666667%",
  },
  eventDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  signInLink: {
    borderWidth: 1,
    borderColor: "#1E3A8A",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  signInText: {
    color: "black",
  },
  eventPlannerCard: {
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 12,
  },
  cardSubtext: {
    fontSize: 14,
    marginBottom: 20,
    color: "#6B7280",
  },
  planEventButton: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#1E3A8A",
    backgroundColor: "#FDE047",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  planEventButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  invitationsCard: {
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  eventsCard: {
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    marginRight: 16,
  },
  canvas: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default HomeScreen;
