import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export const Header = ({ onBack, onSave }) => (
  <View style={styles.header}>
    <Pressable onPress={onBack}>
      <ChevronLeft color="#fbbf24" size={24} />
    </Pressable>
    <Text style={styles.headerTitle}>Customize</Text>
    <Pressable style={styles.saveButton} onPress={onSave}>
      <Text style={styles.saveButtonText}>Save</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fbbf24",
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#fbbf24",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  saveButtonText: {
    color: "#1e3a8a",
    fontWeight: "600",
  },
});
