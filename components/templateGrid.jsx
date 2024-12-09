import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const TemplateGrid = ({ templates }) => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/templates/${item.id}`)}
      style={styles.cardContainer}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={templates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16, // Tailwind's mt-4 is 16px
  },
  cardContainer: {
    backgroundColor: "#fff", // Tailwind's bg-white
    borderRadius: 8, // Tailwind's rounded-lg
    overflow: "hidden",
    width: "48%",
    marginBottom: 16, // Tailwind's mb-4 is 16px
    borderWidth: 1, // Tailwind's border
    borderColor: "#e5e7eb", // Tailwind's border-gray-200
  },
  image: {
    width: "100%",
    height: 160, // Tailwind's h-40 is 160px
    resizeMode: "contain", // Tailwind's object-contain
  },
  textContainer: {
    padding: 8, // Tailwind's p-2 is 8px
  },
  title: {
    fontSize: 14, // Tailwind's text-sm is 14px
    fontWeight: "bold", // Tailwind's font-bold
    textAlign: "center", // Tailwind's text-center
  },
  columnWrapper: {
    justifyContent: "space-between", // To mimic the Tailwind layout
  },
  contentContainer: {
    paddingBottom: 20, // Mimicking Tailwind spacing
  },
});

export default TemplateGrid;
