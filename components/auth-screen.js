import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import GradientBackground from "./linearGradient";
import { LoginForm, OTPForm } from "./auth/forms";
import LoginSuccessCard from "./cards/login-succes";
import { useTranslation } from "react-i18next";
import { useUser } from "../context";

const AuthScreen = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dialCode, setDialCode] = useState("20");
  const [countryCode, setCountryCode] = useState("eg");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { saveUserData } = useUser();
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const clearOTPInputs = () => {
    setOTP(["", "", "", "", "", ""]);
  };

  const handleLogin = async () => {
    try {
      if (!email && !mobile) {
        Alert.alert("Error", "Please enter either email or mobile number.");
        return;
      }

      setLoading(true);

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
      Alert.alert("Error", "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      setLoading(true);

      const requestData = {
        email: email,
        mobile_country_code: dialCode,
        mobile: mobile,
        otp: otp.join(""),
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

      if (response.data.status) {
        saveUserData(response.data.data.user, response.data.data.token);
        console.log(response.data.data);
        setShowSuccessCard(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        clearOTPInputs();
        Alert.alert("Invalid OTP", "Please enter the correct OTP code.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      clearOTPInputs();
      Alert.alert(
        "Error",
        "Invalid OTP. Please try again with the correct code.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      clearOTPInputs();

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
        Alert.alert(t("Success"), "OTP resent successfully!");
      } else {
        Alert.alert("Error", "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP resend error:", error);
      Alert.alert("Error", "An error occurred while resending the OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={28} color="#000000" />
          </TouchableOpacity>
        </View>

        {!showOTPInput ? (
          <View style={styles.loginContainer}>
            {!showSuccessCard ? (
              <LoginForm
                setEmail={setEmail}
                setMobile={setMobile}
                setDialCode={setDialCode}
                setCountryCode={setCountryCode}
                showMobileInput={showMobileInput}
                setShowMobileInput={setShowMobileInput}
                handleLogin={handleLogin}
                t={t}
                loading={loading}
              />
            ) : (
              <LoginSuccessCard />
            )}
          </View>
        ) : (
          <View style={styles.otpContainer}>
            <OTPForm
              handleOTPSubmit={handleOTPSubmit}
              handleResendOTP={handleResendOTP}
              otp={otp}
              setOTP={setOTP}
              loading={loading}
              t={t}
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

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
  otpContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
});

export default AuthScreen;
