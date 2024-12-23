import { Stack } from "expo-router";
import { StudioProvider } from "../../../context";
export default function ProfileLayout() {
  return (
    <StudioProvider>
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
    </StudioProvider>
  );
}
