import { Stack } from "expo-router";
import { conf } from "@/config";

export default function TemplatesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={conf.headerOptions({ title: "Customize Event" })}
      />
      <Stack.Screen
        name="event-details"
        options={{
          ...conf.headerOptions({ title: "Event Details" }),
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="add-contacts"
        options={{
          ...conf.headerOptions({ title: "Add Contacts" }),
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="event-preview"
        options={{
          ...conf.headerOptions({ title: "Event Preview" }),
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
