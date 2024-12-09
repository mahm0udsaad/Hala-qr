import React from "react";
import { Image, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/linearGradient";

const TemplateDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <GradientBackground>
      {/* Whiteboard */}
      <View style={styles.whiteboardContainer}>
        <View style={styles.whiteboardContent}>
          <Image
            source={require("@/assets/images/Card.png")}
            style={styles.whiteboardImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Bottom Menu */}
      <View style={styles.bottomMenuContainer}>
        <Link
          style={styles.nextButton}
          href={{
            pathname: `/add/templates/[id]/event-details`,
            params: { id: id },
          }}
        >
          <Text style={styles.nextButtonText}>Next: Event Details</Text>
        </Link>
      </View>

      <View style={styles.toolbarContainer}>
        <TouchableOpacity style={styles.toolbarItem}>
          <View style={styles.toolbarButton}>
            <Ionicons name="text" size={30} color="#FFDA78" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolbarItem}>
          <View style={styles.toolbarButton}>
            <Ionicons name="image" size={30} color="#FFDA78" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolbarItem}>
          <View style={styles.toolbarButton}>
            <Ionicons name="shapes" size={30} color="#FFDA78" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolbarItem}>
          <View style={styles.toolbarButton}>
            <Ionicons name="color-palette" size={30} color="#FFDA78" />
          </View>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  whiteboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  whiteboardContent: {
    backgroundColor: "white",
    width: "91.666667%",
    height: "80%",
    borderRadius: 8,
  },
  whiteboardImage: {
    width: "100%",
    height: "100%",
  },
  bottomMenuContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  toolbarItem: {
    alignItems: "center",
  },
  toolbarButton: {
    backgroundColor: "#1E3A8A",
    padding: 16,
    borderRadius: 8,
  },
});

export default TemplateDetail;
