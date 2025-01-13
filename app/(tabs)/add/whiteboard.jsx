import { NavigationContainer } from "@react-navigation/native";
import GradientBackground from "../../../components/linearGradient";
import { InvitationStudio } from "../../../components/studio";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Whiteboard() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <GradientBackground>
          <InvitationStudio />
        </GradientBackground>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
