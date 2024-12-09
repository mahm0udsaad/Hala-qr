import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { data } from "../../../../data/constant";

export default function TemplatesGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const scrollViewRef = useRef(null);
  const scrollX = useSharedValue(0); // Shared value for Reanimated

  const categories = ["All", "Wedding", "Birthday", "Party", "Meeting"];

  // Scroll Indicator width and position based on scroll value
  const indicatorStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [0, categories.length * 100 - 300],
      [50, 150], // Adjust based on the length of the ScrollView
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      scrollX.value,
      [0, categories.length * 100 - 300],
      [0, 300 - 50], // Adjust based on ScrollView width
      Extrapolate.CLAMP,
    );

    return {
      width: withTiming(width, { duration: 300 }),
      transform: [{ translateX: withTiming(translateX, { duration: 300 }) }],
    };
  });

  const handleCategoryPress = (index) => {
    setActiveCategory(categories[index]);

    // Scroll to the selected category with animation
    const scrollToX = index * 100; // Adjust the 100 based on button width
    scrollX.value = withTiming(scrollToX, { duration: 300 });

    // Use the ref to scroll the ScrollView
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollToX,
        animated: true,
      });
    }
  };

  const renderItem = ({ item }) => (
    <Link
      href={{ pathname: `/add/templates/[id]`, params: { id: item.id } }}
      asChild
    >
      <TouchableOpacity style={styles.templateItem}>
        <Image
          source={require("@/assets/images/Card.png")} // Ensure this path is correct
          style={styles.templateImage}
          resizeMode="cover"
        />
        <View style={styles.templateTitleContainer}>
          <Text style={styles.templateTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* Horizontal Scrollable Categories */}
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryTouchable}
            onPress={() => handleCategoryPress(index)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category
                  ? styles.activeCategoryText
                  : styles.inactiveCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scroll Indicator */}
      <View style={styles.indicatorBackground}>
        <Animated.View style={[indicatorStyle, styles.indicatorForeground]} />
      </View>

      {/* Template Section */}
      <View style={styles.templateSectionHeader}>
        <Text style={styles.templateSectionTitle}>
          {activeCategory} Templates
        </Text>
      </View>

      <SafeAreaView style={styles.flatListContainer}>
        <FlatList
          data={data} // Make sure 'data' contains filtered results based on 'activeCategory' if needed
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.flatListColumnWrapper}
          contentContainerStyle={styles.flatListContentContainer}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  categoriesScrollView: {
    flexDirection: "row",
  },
  categoryTouchable: {
    marginRight: 8,
  },
  categoryText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "600",
  },
  activeCategoryText: {
    backgroundColor: "#FBBF24",
    color: "#1E3A8A",
  },
  inactiveCategoryText: {
    backgroundColor: "#BFDBFE",
    color: "#1E3A8A",
  },
  indicatorBackground: {
    marginTop: 16,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },
  indicatorForeground: {
    height: 4,
    backgroundColor: "#FBBF24",
    borderRadius: 2,
  },
  templateSectionHeader: {
    marginTop: 24,
  },
  templateSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5563",
  },
  flatListContainer: {
    marginTop: 16,
  },
  templateItem: {
    borderRadius: 8,
    overflow: "hidden",
    width: "48%",
    marginBottom: 16,
  },
  templateImage: {
    width: "100%",
    height: 240,
  },
  templateTitleContainer: {
    padding: 8,
  },
  templateTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  flatListColumnWrapper: {
    justifyContent: "space-between",
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});
