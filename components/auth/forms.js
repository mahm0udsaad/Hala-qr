import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
const countries = [
  { name: "Egypt", dialCode: "20", code: "EG", flag: "🇪🇬" },
  { name: "Saudi Arabia", dialCode: "966", code: "SA", flag: "🇸🇦" },
  { name: "United Arab Emirates", dialCode: "971", code: "AE", flag: "🇦🇪" },
  { name: "Kuwait", dialCode: "965", code: "KW", flag: "🇰🇼" },
];

export const LoginForm = ({
  setEmail,
  setMobile,
  setDialCode,
  setCountryCode,
  showMobileInput,
  setShowMobileInput,
  handleLogin,
  t,
  loading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDialCode(country.dialCode);
    setCountryCode(country.code.toLowerCase());
    setModalVisible(false);
  };

  const CountrySelector = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Select Country</Text>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryDialCode}>+{item.dialCode}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.loginCard}>
      <Text style={styles.welcomeText}>{t("welcomeBack")}</Text>

      {!showMobileInput ? (
        <TextInput
          style={styles.input}
          placeholder={t("email")}
          placeholderTextColor="#9CA3AF"
          onChangeText={setEmail}
        />
      ) : (
        <View>
          <TouchableOpacity
            style={styles.countryPickerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
            <Text style={styles.countryDialCode}>
              +{selectedCountry.dialCode}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder={t("phoneNumber")}
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            onChangeText={setMobile}
          />
        </View>
      )}

      <CountrySelector />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.primaryButtonText}>{t("signIn")}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setShowMobileInput(!showMobileInput)}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>
          {showMobileInput ? t("useEmail") : t("usePhoneNumber")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export const OTPInput = ({ otp, setOTP }) => {
  const otpInputs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && !otp[index]) {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpInputContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          placeholder="0"
          placeholderTextColor="#9CA3AF"
          value={digit}
          onChangeText={(value) => handleOTPChange(index, value)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(index);
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
          ref={(ref) => (otpInputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};
export const OTPForm = ({
  handleOTPSubmit,
  handleResendOTP,
  otp,
  setOTP,
  loading,
  t,
}) => {
  return (
    <View style={styles.otpCard}>
      <Text style={styles.otpHeaderText}>{t("enterOtp")}</Text>

      <OTPInput otp={otp} setOTP={setOTP} />
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleOTPSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.primaryButtonText}>{t("verifyOtp")}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleResendOTP}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>{t("resendOtp")}</Text>
      </TouchableOpacity>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
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
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 18,
    color: "#1F2937",
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 10,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  countryDialCode: {
    fontSize: 16,
    color: "#6B7280",
  },
  closeModalButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
  },
  closeModalButtonText: {
    textAlign: "center",
    color: "#1F2937",
    fontWeight: "600",
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 30,
    marginBottom: 10,
  },
  phoneInput: {
    paddingLeft: 20,
  },
});
