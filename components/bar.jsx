import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSegments } from "expo-router";

function TabBarIcon(props) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}
function CustomTabBar({ state, descriptors, navigation }) {
  const segments = useSegments();
  const isInSegments = (routes) =>
    routes.some((route) => segments.includes(route));
  const isAddScreenActive =
    state.index === state.routes.findIndex((route) => route.name === "add");

  // Conditionally hide the bottom tab bar when on the 'whiteboard' screen
  const shouldHideTabBar =
    segments.includes("whiteboard") || segments.includes("[id]");

  if (shouldHideTabBar) return null;

  return (
    <View
      style={{
        position: "relative",
        display: isInSegments(["payment-info", "whiteboard"]) ? "none" : "flex",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e2e2e2",
          height: 70,
          paddingBottom: 16,
          marginBottom: Platform.OS === "ios" ? 12 : 0,
          alignItems: "center",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          let iconName;
          if (route.name === "index") {
            iconName = isFocused ? "home" : "home-outline";
          } else if (route.name === "events") {
            iconName = isFocused ? "calendar" : "calendar-outline";
          } else if (route.name === "messages") {
            iconName = isFocused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "profile") {
            iconName = isFocused ? "person" : "person-outline";
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(route.name); // Use navigation to go to the route
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {route.name === "add" ? (
                <View style={{ width: 40, height: 40 }} />
              ) : (
                <>
                  <TabBarIcon
                    name={iconName}
                    color={isFocused ? "#003b95" : "gray"}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: isFocused ? "#003b95" : "gray",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          marginLeft: -35,
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("add")} // Navigate to the "add" route
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: isAddScreenActive ? "#FFDA78" : "#003b95",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TabBarIcon
            name="add-outline"
            color={isAddScreenActive ? "#003b95" : "white"}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomTabBar;
