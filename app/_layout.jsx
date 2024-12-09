import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { View, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomOnboarding from "@/components/onboard";
import { Video, ResizeMode } from "expo-av";
import "intl-pluralrules"; // Polyfill for Intl.PluralRules
import "./i18n"; // import the i18n configuration file
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [videoIsFinished, setVideoIsFinished] = useState(false);
  const [videoLayout, setVideoLayout] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * (16 / 9), // Assuming 16:9 video, adjust ratio based on your video
  });

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    async function prepare() {
      try {
        const status = await AsyncStorage.getItem("hasSeenOnboarding");
        setHasSeenOnboarding(status === "true");
      } catch (e) {
        console.warn("Error preparing app:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const handleVideoFinish = useCallback((status) => {
    if (status.didJustFinish) {
      setVideoIsFinished(true);
    }
  }, []);

  const handleVideoLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setVideoLayout({ width, height });
  }, []);

  // Show video splash screen during loading
  if (!appIsReady || !fontsLoaded || !videoIsFinished) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#464f60",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Video
          source={require("../assets/video/splash.mp4")}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping={false}
          onLayout={handleVideoLayout}
          style={{
            width: videoLayout.width,
            height: videoLayout.height,
          }}
          onPlaybackStatusUpdate={handleVideoFinish}
        />
      </View>
    );
  }

  if (fontError) throw fontError;

  return (
    <View style={{ flex: 1 }}>
      {hasSeenOnboarding ? (
        <I18nextProvider i18n={i18n}>
          <RootLayoutNav />
        </I18nextProvider>
      ) : (
        <OnboardingWrapper setHasSeenOnboarding={setHasSeenOnboarding} />
      )}
    </View>
  );
}

function OnboardingWrapper({ setHasSeenOnboarding }) {
  const handleOnboardingFinish = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  return <CustomOnboarding onFinish={handleOnboardingFinish} />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="authModal"
        options={{
          presentation: "fullScreenModal",
          headerStyle: {
            backgroundColor: "transparent",
          },
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
