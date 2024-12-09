import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import GradientBackground from "@/components/linearGradient";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ModalScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dialCode, setDialCode] = useState("20");
  const [countryCode, setCountryCode] = useState("eg");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email && !mobile) {
        Alert.alert("Error", "Please enter either email or mobile number.");
        return;
      }

      const requestData = {
        email: email,
        mobile_country_code: dialCode,
        mobile: mobile,
      };

      const response = await axios.post(
        `https://hala-qr.jmintel.net/api/v1/auth/login`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      console.log("Login success:", response.data);
      setShowOTPInput(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const requestData = {
        email: email,
        mobile_country_code: dialCode,
        mobile: mobile,
        otp: otp,
        fcm_token:
          "APA91bEpIDu9PSaFhBaKqsQOYBuJNs1oV5xyDQpsogToFJRPNjLotVIHQ8H4yphC3f9_oWP6SFTYhhr3g5d_fa",
      };

      const response = await axios.post(
        "https://hala-qr.jmintel.net/api/v1/auth/verify-otp",
        { ...requestData },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );
      console.log("OTP verification response:", response);

      if (response.data.success) {
        Alert.alert("Success", "OTP verification successful!");
        router.push("/");
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert("Error", "An error occurred during OTP verification.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "https://hala-qr.jmintel.net/api/v1/auth/resend-otp",
        { email, mobile, dialCode },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (response.data.success) {
        Alert.alert("Success", "OTP resent successfully!");
      } else {
        Alert.alert("Error", "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP resend error:", error);
      Alert.alert("Error", "An error occurred while resending the OTP.");
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close-outline" size={28} color="#000000" />
          </TouchableOpacity>
        </View>

        {!showOTPInput && (
          <View style={styles.loginContainer}>
            <View style={styles.loginCard}>
              <Text style={styles.welcomeText}>{t("welcomeBack")}</Text>

              {!showMobileInput && (
                <TextInput
                  style={styles.input}
                  placeholder={t("email")}
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                />
              )}

              {showMobileInput && (
                <TextInput
                  style={styles.input}
                  placeholder={t("phoneNumber")}
                  placeholderTextColor="#9CA3AF"
                  value={mobile}
                  onChangeText={setMobile}
                />
              )}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleLogin}
              >
                <Text style={styles.primaryButtonText}>{t("signIn")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setShowMobileInput(!showMobileInput)}
              >
                <Text style={styles.secondaryButtonText}>
                  {showMobileInput ? t("useEmail") : t("usePhoneNumber")}
                </Text>
              </TouchableOpacity>

              <Text style={styles.continueWithText}>{t("continueWith")}</Text>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialLoginButton}>
                  <Ionicons name="logo-google" size={32} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLoginButton}>
                  <Ionicons name="logo-apple" size={32} color="#000000" />
                </TouchableOpacity>
              </View>

              <Text style={styles.signupText}>
                {t("noAccount")}{" "}
                <Text style={styles.signupLinkText}>{t("signUp")}</Text>
              </Text>
            </View>
          </View>
        )}

        {showOTPInput && (
          <View style={styles.otpContainer}>
            <View style={styles.otpCard}>
              <Text style={styles.otpHeaderText}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="000"
                placeholderTextColor="#9CA3AF"
                value={otp}
                onChangeText={setOTP}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleOTPSubmit}
              >
                <Text style={styles.primaryButtonText}>Verify OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleResendOTP}
              >
                <Text style={styles.secondaryButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButtonContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  closeButton: {
    padding: 8,
    zIndex: 10,
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  loginCard: {
    backgroundColor: "#FBFBFB",
    padding: 32,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#1F2937",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    color: "#1F2937",
  },
  primaryButton: {
    backgroundColor: "#1D4ED8",
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1D4ED8",
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: "#1D4ED8",
    textAlign: "center",
    fontWeight: "600",
  },
  continueWithText: {
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 24,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 16,
  },
  socialLoginButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signupText: {
    textAlign: "center",
    color: "#4B5563",
  },
  signupLinkText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  otpContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  otpCard: {
    backgroundColor: "#FBFBFB",
    width: "100%",
    padding: 32,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  otpHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1F2937",
  },
});
