import TextCanvasScreen from "../../../components/studio";
import GradientBackground from "../../../components/linearGradient";
import { StudioProvider } from "../../../context";
import { NavigationContainer } from "@react-navigation/native";

export default function Whiteboard() {
  return (
    <GradientBackground>
      <NavigationContainer>
        <TextCanvasScreen />
      </NavigationContainer>
    </GradientBackground>
  );
}
