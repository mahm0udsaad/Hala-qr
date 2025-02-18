import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  User,
  Bell,
  HelpCircle,
  CreditCard,
  Mail,
  LogOut,
  ChevronRight,
  LogIn,
} from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import LanguageSwitchButton from "../../../components/btns/lang-switcher";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import { useUser } from "../../../context";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const router = useRouter();

  const menuItems = [
    {
      title: t("editProfile"),
      icon: User,
      route: "edit-profile",
    },
    {
      title: t("notifications"),
      icon: Bell,
      route: "notifications",
    },
    { title: t("faq"), icon: HelpCircle, route: "faq" },
    {
      title: t("paymentInfo"),
      icon: CreditCard,
      route: "payment-info",
    },
    {
      title: t("contactUs"),
      icon: Mail,
      route: "contact-us",
    },
  ];

  const handleLogout = async () => {
    console.log("Starting logout process");
    try {
      router.replace("/");
      logout();
    } catch (error) {
      console.error("Logout failed with error:", error);
      // Consider showing an error message to the user
    }
  };

  if (!user) {
    return (
      <View style={styles.signInContainer}>
        <LogIn size={48} color="#003b95" style={styles.signInIcon} />
        <Text style={styles.signInTitle}>{t("signInRequired")}</Text>
        <Text style={styles.signInText}>
          {t("pleaseSignInToAccessProfile")}
        </Text>
        <Link href="/authModal" asChild>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>{t("signIn")}</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.linksContainer}>
          <Link href="/profile/terms">
            <Text style={styles.linkText}>{t("termsOfService")}</Text>
          </Link>
          <Link href="/profile/privacy">
            <Text style={styles.linkText}>{t("privacyPolicy")}</Text>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 90, height: 90, borderRadius: 48 }}
            accessibilityLabel="User Avatar"
          />
        </View>
        <Text style={styles.profileName}>
          {user.f_name} {user.l_name}
        </Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <View style={styles.packageContainer}>
          <Text style={styles.packageText}>{`${t(
            "package.title",
          )}: Free`}</Text>
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
              <item.icon size={24} color="#003b95" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ChevronRight size={24} color="#003b95" />
          </View>
        </Link>
      ))}

      <TouchableOpacity onPress={handleLogout}>
        <View style={[styles.menuItem, isRTL && styles.menuItemRTL]}>
          <View
            style={[styles.menuItemContent, isRTL && styles.menuItemContentRTL]}
          >
            <LogOut size={24} color="#DC2626" />
            <Text style={[styles.menuItemText, styles.logoutText]}>
              {t("signOut")}
            </Text>
          </View>
          <ChevronRight size={24} color="#DC2626" />
        </View>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginHorizontal: "auto",
  },
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  signInIcon: {
    marginBottom: 24,
  },
  signInTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  signInText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: "#003b95",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 32,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
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
    color: "#6B7280",
  },
  packageContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: "#FCD34D",
    borderRadius: 16,
  },
  packageText: {
    fontSize: 14,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
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
  logoutText: {
    color: "#DC2626",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  linkText: {
    color: "#2563EB",
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
