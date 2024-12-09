import React from "react";
import { Button } from "react-native";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageSwitchButton = () => {
  const switchLanguage = async () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    await AsyncStorage.setItem("language", newLang); // Save language choice
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      title={
        i18n.language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
      }
      onPress={switchLanguage}
    />
  );
};

export default LanguageSwitchButton;
