import GradientBackground from "../../../components/linearGradient";
import { InvitationStudio } from "../../../components/studio";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Whiteboard() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GradientBackground>
        <InvitationStudio />
      </GradientBackground>
    </GestureHandlerRootView>
  );
}
