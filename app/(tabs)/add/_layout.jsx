import { Stack } from "expo-router";
import { conf } from "@/config";
export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Create Event",
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="whiteboard"
        options={conf.headerOptions({ title: "Whiteboard" })}
      />
      <Stack.Screen name="templates" options={{ headerShown: false }} />
    </Stack>
  );
}
