import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

const LanguageSwitchButton = () => {
  const switchLanguage = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    await AsyncStorage.setItem("language", newLang); // Save language choice
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <TouchableOpacity style={styles.button} onPress={switchLanguage}>
        <Text style={styles.buttonText}>
          {i18n.language === "en"
            ? "Switch to Arabic"
            : "التبديل إلى الإنجليزية"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default LanguageSwitchButton;
