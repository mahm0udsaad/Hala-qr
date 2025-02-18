import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { View, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomOnboarding from "@/components/onboard";
import { Video, ResizeMode } from "expo-av";
import "intl-pluralrules";
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { UserProvider } from "../context";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [videoIsFinished, setVideoIsFinished] = useState(false);
  const [videoLayout, setVideoLayout] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * (16 / 9),
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

  const handleOnboardingFinish = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  if (!appIsReady || !fontsLoaded || !videoIsFinished) {
    return (
      <View style={{ flex: 1, backgroundColor: "#464f60" }}>
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
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <View style={{ flex: 1 }}>
          {hasSeenOnboarding ? (
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
          ) : (
            <CustomOnboarding onFinish={handleOnboardingFinish} />
          )}
        </View>
      </UserProvider>
    </I18nextProvider>
  );
}
