import { Stack } from "expo-router";

export default function AddLayout() {
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
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="templates" options={{ headerShown: false }} />
    </Stack>
  );
}
