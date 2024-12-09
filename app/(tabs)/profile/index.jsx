import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import LanguageSwitchButton from "../../../components/btns/lang-switcher";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";

const ProfileScreen = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t("editProfile"),
      icon: "person-outline",
      route: "edit-profile",
    },
    {
      title: t("notifications"),
      icon: "notifications-outline",
      route: "notifications",
    },
    { title: t("faq"), icon: "help-circle-outline", route: "faq" },
    {
      title: t("paymentInfo"),
      icon: "card-outline",
      route: "payment-info",
    },
    {
      title: t("contactUs"),
      icon: "mail-outline",
      route: "contact-us",
    },
    { title: t("signOut"), icon: "log-out-outline", route: "sign-out" },
  ];

  return (
    <ScrollView>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <Text style={styles.profileName}>Mahmoud Saad</Text>
        <Text style={styles.profileEmail}>101MahmoudSaad@gmail.com</Text>
        <View style={styles.packageContainer}>
          <Text style={styles.packageText}>{`${t(
            "profile.package",
          )}: Gold`}</Text>
        </View>
      </View>

      {menuItems.map((item, index) => (
        <Link key={index} href={`/profile/${item.route}`}>
          <View style={[styles.menuItem, isRTL && styles.menuItemRTL]}>
            <View
              style={[
                styles.menuItemContent,
                isRTL && styles.menuItemContentRTL,
              ]}
            >
              <Ionicons name={item.icon} size={24} color="#003b95" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#003b95" />
          </View>
        </Link>
      ))}
      <LanguageSwitchButton />

      <View style={styles.linksContainer}>
        <Link href="/profile/terms">
          <Text style={styles.linkText}>{t("termsOfService")}</Text>
        </Link>
        <Link href="/profile/privacy">
          <Text style={styles.linkText}>{t("privacyPolicy")}</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#003b95",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  profileName: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "600",
  },
  profileEmail: {
    color: "#6B7280", // Tailwind's gray-500
  },
  packageContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FCD34D", // Tailwind's yellow-300
    borderRadius: 16,
  },
  packageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB", // Tailwind's gray-200
  },
  menuItemRTL: {
    flexDirection: "row-reverse",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemContentRTL: {
    flexDirection: "row-reverse",
  },
  menuItemText: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  linkText: {
    color: "#2563EB", // Tailwind's blue-500
    marginHorizontal: 16,
  },
});
