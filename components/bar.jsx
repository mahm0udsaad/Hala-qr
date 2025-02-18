import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { useSegments } from "expo-router";
import { Home, Calendar, MessageSquare, User, Plus } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Calculate responsive values
const getResponsiveSize = (size) => {
  const scaleFactor = SCREEN_WIDTH / 375; // Base width for iPhone
  return Math.min(size * scaleFactor, size * 1.3); // Cap the scaling
};

function TabBarIcon({ name, color, size = 24, ...props }) {
  const iconProps = {
    color,
    size: getResponsiveSize(size),
    strokeWidth: 2,
    ...props,
  };

  switch (name) {
    case "home":
    case "home-outline":
      return <Home {...iconProps} />;
    case "calendar":
    case "calendar-outline":
      return <Calendar {...iconProps} />;
    case "chatbox":
    case "chatbox-outline":
      return <MessageSquare {...iconProps} />;
    case "person":
    case "person-outline":
      return <User {...iconProps} />;
    case "add-outline":
      return <Plus {...iconProps} />;
    default:
      return null;
  }
}

function CustomTabBar({ state, descriptors, navigation }) {
  const segments = useSegments();
  const isInSegments = (routes) =>
    routes.some((route) => segments.includes(route));
  const isAddScreenActive =
    state.index === state.routes.findIndex((route) => route.name === "add");

  const shouldHideTabBar =
    segments.includes("whiteboard") || segments.includes("[id]");

  if (shouldHideTabBar) return null;

  // Calculate responsive dimensions
  const TAB_HEIGHT = getResponsiveSize(70);
  const BUTTON_SIZE = getResponsiveSize(60);
  const OUTER_BUTTON_SIZE = getResponsiveSize(70);
  const BOTTOM_PADDING = Platform.OS === "ios" ? getResponsiveSize(12) : 0;

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
          height: TAB_HEIGHT,
          paddingBottom: getResponsiveSize(16),
          marginBottom: BOTTOM_PADDING,
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
                navigation.navigate(route.name);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: TAB_HEIGHT,
              }}
            >
              {route.name === "add" ? (
                <View style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }} />
              ) : (
                <>
                  <TabBarIcon
                    name={iconName}
                    color={isFocused ? "#003b95" : "gray"}
                    style={{ marginBottom: -3 }}
                  />
                  <Text
                    style={{
                      fontSize: getResponsiveSize(12),
                      color: isFocused ? "#003b95" : "gray",
                      marginTop: getResponsiveSize(4),
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
          top: -OUTER_BUTTON_SIZE / 2,
          left: "50%",
          marginLeft: -OUTER_BUTTON_SIZE / 2,
          width: OUTER_BUTTON_SIZE,
          height: OUTER_BUTTON_SIZE,
          borderRadius: OUTER_BUTTON_SIZE / 2,
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
          onPress={() => navigation.navigate("add")}
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            borderRadius: BUTTON_SIZE / 2,
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
