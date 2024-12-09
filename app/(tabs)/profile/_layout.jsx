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
          headerRight: () => (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                console.log("Save pressed");
              }}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          ),
          title: "Edit Profile",
          animation: "slide_from_right",
          ...commonOptions,
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
          title: "Frequently Asked Questions",
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          title: "Terms of Service",
          animation: "slide_from_right",
          ...commonOptions,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: "Privacy Policy",
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
