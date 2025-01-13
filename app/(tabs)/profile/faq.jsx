import React from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import RenderHtml from "react-native-render-html";
import useFetch from "../../../hooks/use-fetch";
import { useWindowDimensions } from "react-native";

const FaqScreen = () => {
  const { data, isLoading, error } = useFetch("/faqs");
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading FAQs</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((faq) => (
        <View key={faq.id} style={styles.card}>
          <Text style={styles.title}>{faq.title}</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: faq.description }}
            baseStyle={styles.description}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background color for the entire screen
  },
  card: {
    backgroundColor: "#fff", // White card background
    borderRadius: 12, // Rounded corners for the card
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Shadow for Android
    borderLeftWidth: 4,
    borderLeftColor: "#008040",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333", // Darker text color for the title
  },
  description: {
    fontSize: 16,
    lineHeight: 24, // Improve readability with line height
    color: "#666", // Softer text color for the description
  },
});

export default FaqScreen;
