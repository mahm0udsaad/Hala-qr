import DOMComponent from "@/components/test";

export default function HomeScreen() {
  return (
    // This is a DOM component. It re-exports a wrapped `react-native-webview` behind the scenes.
    <DOMComponent name="Europa" />
  );
}
