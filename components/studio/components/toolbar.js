import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image, Palette, Shapes, Type } from "lucide-react-native";

export const ToolBar = ({ onToolSelect }) => (
  <View style={styles.toolbar}>
    {[
      { Icon: Type, id: "text" },
      { Icon: Shapes, id: "shapes" },
      { Icon: Image, id: "image" },
      { Icon: Palette, id: "palette" },
    ].map(({ Icon, id }, index) => (
      <Pressable
        key={id}
        style={styles.toolButton}
        onPress={() => onToolSelect(id)}
      >
        <Icon color="#fbbf24" size={24} />
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#1e3a8a",
  },
  toolButton: {
    alignItems: "center",
    borderColor: "#fbbf24",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
});
