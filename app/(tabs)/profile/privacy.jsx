import React from "react";
import { ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";
import RenderHtml from "react-native-render-html";
import useFetch from "../../../hooks/use-fetch";
import { useWindowDimensions } from "react-native";

const TermsScreen = () => {
  const { data, isLoading, error } = useFetch("/pages/3/show"); // Fetch terms data
  const { width } = useWindowDimensions(); // For responsive rendering

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text>Error loading terms and policy</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.page.title}</Text>
      <RenderHtml
        contentWidth={width}
        source={{ html: data.page.content }}
        baseStyle={styles.content}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // Padding for overall content
  },
  title: {
    borderBottomColor: "#ccc", // Darker border color for the title
    borderBottomWidth: 1, // Thicker border for the title
    paddingBottom: 10, // Padding below the title
    fontSize: 24, // Larger font size for the title
    fontWeight: "700", // Bold title
    marginBottom: 20, // Margin below the title
    color: "#333", // Dark text color for the title
    textAlign: "center", // Center the title
  },
  content: {
    fontSize: 16,
    lineHeight: 28, // Larger line height for readability
    color: "#666", // Softer text color for content
    textAlign: "justify", // Justified text alignment for clean layout
  },
});

export default TermsScreen;
