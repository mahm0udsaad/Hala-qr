import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const commonOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#003b95",
  },
  headerTintColor: "#FFDA78",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function ProfileLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("profile"),
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="faq"
        options={{
          title: t("faq"),
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: t("termsOfService"),
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: t("privacyPolicy"),
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="payment-info"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contact-us"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    borderColor: "#FFDA78",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saveButtonText: {
    color: "#FFDA78",
    fontWeight: "bold",
  },
});
