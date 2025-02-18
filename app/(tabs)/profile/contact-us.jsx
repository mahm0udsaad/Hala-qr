import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href={"/profile"} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFDA78" />
        </Link>
        <Text style={styles.headerTitle}>{t("contactUs")}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{t("submit")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isRTL && styles.inputRTL]}>
              {t("name")}
            </Text>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t("enterYourName")}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              textAlign={isRTL ? "right" : "left"}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isRTL && styles.inputRTL]}>
              {t("email")}
            </Text>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t("enterYourEmail")}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              textAlign={isRTL ? "right" : "left"}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isRTL && styles.inputRTL]}>
              {t("phone")}
            </Text>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t("enterYourPhone")}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              textAlign={isRTL ? "right" : "left"}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, isRTL && styles.inputRTL]}>
              {t("message")}
            </Text>
            <TextInput
              style={[styles.messageInput, isRTL && styles.inputRTL]}
              placeholder={t("enterYourMessage")}
              multiline
              numberOfLines={4}
              value={formData.message}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              textAlign={isRTL ? "right" : "left"}
            />
          </View>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>{t("followUs")}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Facebook size={24} color="#003B95" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Twitter size={24} color="#003B95" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Instagram size={24} color="#003B95" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Mail size={24} color="#003B95" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Phone size={24} color="#003B95" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#003B95",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#FFDA78",
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  submitButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFDA78",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#FFDA78",
    fontSize: 16,
    fontWeight: "600",
  },
  titleContainer: {
    padding: 20,
    backgroundColor: "#003B95",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  inputRTL: {
    textAlign: "right",
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    height: 120,
    textAlignVertical: "top",
  },
  socialContainer: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 16,
    textAlign: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  iconButton: {
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ContactUs;
