import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "@/components/linearGradient";
import { invitationIconXml, noEventsIconXml } from "@/assets/svg/icons.js";
import { Link } from "expo-router";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();
  const userName = "Mahmoud";

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>
            {t("helloUser", { name: userName })}
          </Text>
          <Link
            href="/authModal"
            style={styles.signInLink}
          >
            <Text style={styles.signInText}>{t("signIn")}</Text>
          </Link>
        </View>

        <View style={styles.eventPlannerCard}>
          <Text style={styles.cardText}>{t("allSet")}</Text>
          <Text style={styles.cardSubtext}>{t("extraordinaryEvents")}</Text>
          <TouchableOpacity style={styles.planEventButton}>
            <Text style={styles.planEventButtonText}>{t("planEvent")}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t("invitations")}</Text>
        <View style={styles.invitationsCard}>
          <View style={styles.invitationIconContainer}>
            <SvgXml xml={invitationIconXml} width={120} height={120} />
          </View>
          <View style={styles.invitationTextContainer}>
            <Text style={styles.invitationTitle}>{t("noInvitations")}</Text>
            <Text style={styles.invitationSubtext}>
              {t("noInvitationsText")}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t("upcomingEvents")}</Text>
        <View style={styles.eventsCard}>
          <View style={styles.eventIconContainer}>
            <SvgXml xml={noEventsIconXml} width={120} height={120} />
          </View>
          <View style={styles.eventTextContainer}>
            <Text style={styles.eventTitle}>{t("noEvents")}</Text>
            <Text style={styles.eventSubtext}>{t("noEventsText")}</Text>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 16,
    marginHorizontal: 'auto',
    width: '91.666667%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  signInLink: {
    borderWidth: 1,
    borderColor: '#1E3A8A',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  signInText: {
    color: 'black',
  },
  eventPlannerCard: {
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    marginBottom: 8,
  },
  cardSubtext: {
    marginBottom: 16,
  },
  planEventButton: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    backgroundColor: '#FDE047',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  planEventButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  invitationsCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invitationIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  invitationTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  invitationTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
  },
  invitationSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventsCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  eventTextContainer: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
  },
  eventSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default HomeScreen;