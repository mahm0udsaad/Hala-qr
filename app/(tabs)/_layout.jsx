import React from "react";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import CustomTabBar from "@/components/bar";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: t("home") }} />
      <Tabs.Screen name="events" options={{ title: t("events") }} />
      <Tabs.Screen name="add" options={{ title: t("add") }} />
      <Tabs.Screen name="messages" options={{ title: t("messages") }} />
      <Tabs.Screen name="profile" options={{ title: t("profile") }} />
    </Tabs>
  );
}
