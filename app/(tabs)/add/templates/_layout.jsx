import { Stack } from "expo-router";
import { conf } from "@/config";

export default function TemplatesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={conf.headerOptions({ title: "Templates" })}
      />
      <Stack.Screen
        name="[id]"
        options={{ animation: "slide_from_right", headerShown: false }} // Customize options as needed
      />
    </Stack>
  );
}
