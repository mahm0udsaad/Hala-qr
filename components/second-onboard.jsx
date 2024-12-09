import i18n from "@/app/i18n";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const LanguageSelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { code: "ar", name: "العربية" },
    { code: "en", name: "English" },
  ];

  const handleLanguageSelect = async (languageCode) => {
    setSelectedLanguage(languageCode);
    await AsyncStorage.setItem("language", languageCode);
    i18n.changeLanguage(languageCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language to continue</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.languageHeader}>
          <Text style={styles.languageHeaderText}>Languages</Text>
        </TouchableOpacity>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            onPress={() => handleLanguageSelect(language.code)}
            style={[
              styles.languageOption,
              selectedLanguage === language.code && styles.selectedLanguage,
            ]}
          >
            <Text
              style={[
                styles.languageText,
                language.code === "ar" && styles.boldText,
              ]}
            >
              {language.name}
            </Text>
            {selectedLanguage === language.code ? (
              <Ionicons name="checkmark" size={24} color="#007AFF" />
            ) : (
              <Ionicons name="remove" size={24} color="#999" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, // Tailwind's p-6
    justifyContent: "center",
  },
  title: {
    fontSize: 24, // Tailwind's text-2xl
    fontWeight: "bold", // Tailwind's font-bold
    marginBottom: 32, // Tailwind's mb-8
    textAlign: "center", // Tailwind's text-center
  },
  card: {
    backgroundColor: "#FFFFFF", // Tailwind's bg-white
    borderRadius: 16, // Tailwind's rounded-xl
    padding: 16, // Tailwind's p-4
    shadowColor: "#000", // Mimicking Tailwind's shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // For Android
  },
  languageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // Tailwind's mb-4
  },
  languageHeaderText: {
    color: "#007AFF", // Tailwind's text-blue-600
    fontSize: 18, // Tailwind's text-lg
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1, // Tailwind's border-t
    padding: 16, // Tailwind's px-4
    borderColor: "#E5E7EB", // Tailwind's border-gray-200
  },
  selectedLanguage: {
    backgroundColor: "#FEF3C7", // Tailwind's bg-yellow-100
    borderRadius: 8, // Tailwind's rounded
  },
  languageText: {
    fontSize: 18, // Tailwind's text-lg
  },
  boldText: {
    fontWeight: "bold", // Tailwind's font-bold
  },
});
