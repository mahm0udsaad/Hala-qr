import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowBigLeft,
  ArrowLeft,
  Camera,
  ChevronLeft,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useUser } from "../../../context";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

const countries = [
  { name: "Egypt", dialCode: "20", code: "EG", flag: "🇪🇬" },
  { name: "Saudi Arabia", dialCode: "966", code: "SA", flag: "🇸🇦" },
  { name: "United Arab Emirates", dialCode: "971", code: "AE", flag: "🇦🇪" },
  { name: "Kuwait", dialCode: "965", code: "KW", flag: "🇰🇼" },
];

const EditProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const { user, saveUserData, token } = useUser();
  const [firstName, setFirstName] = useState(user.f_name || "");
  const [lastName, setLastName] = useState(user.l_name || "");
  const [email, setEmail] = useState(user.email || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const isRTL = i18n.dir() === "rtl";

  // Get user's country from phone number or default to first country
  const getUserCountry = () => {
    if (!user.mobile) return countries[0];
    const country = countries.find((c) => user.mobile.startsWith(c.dialCode));
    return country || countries[0];
  };

  const [selectedCountry] = useState(getUserCountry());

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage.uri,
      type: selectedImage.mimeType || "image/jpeg",
      name: selectedImage.fileName || "image.jpg",
    });

    try {
      const response = await axios.post(
        "https://hala-qr.jmintel.net/api/v1/image-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data.file_name;
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Error", "Failed to upload image");
      return null;
    }
  };

  const handleSaveProfile = async () => {
    try {
      const avatarUrl = selectedImage ? await uploadImage() : null;
      const formData = new FormData();
      formData.append("f_name", firstName);
      formData.append("l_name", lastName);
      formData.append("email", email);

      if (avatarUrl) {
        formData.append("avatar", avatarUrl);
      }

      await axios.post(
        "https://hala-qr.jmintel.net/api/v1/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      saveUserData(
        {
          ...user,
          f_name: firstName,
          l_name: lastName,
          email,
          avatar: avatarUrl
            ? `https://hala-qr.jmintel.net/images/${avatarUrl}`
            : user.avatar,
        },
        token,
      );

      Alert.alert(t("Success"), t("profileUpdateSuccess"));
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error.message,
      );
      Alert.alert("Error", t("profileUpdateError"));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href={"/profile"} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFDA78" />
        </Link>
        <Text style={styles.headerTitle}>{t("editProfileTitle")}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>{t("save")}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePictureWrapper}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage.uri }
                  : user.avatar
                  ? { uri: user.avatar }
                  : require("../../../assets/images/user.png")
              }
              style={styles.profilePicture}
            />
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={pickImage}
            >
              <Camera size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.nameInputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, !isRTL && styles.textRTL]}>
                {t("firstName")}
              </Text>
              <TextInput
                style={[styles.textInput, isRTL && styles.textInputRTL]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder={t("firstName")}
                textAlign={isRTL ? "right" : "left"}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, !isRTL && styles.textRTL]}>
                {t("lastName")}
              </Text>
              <TextInput
                style={[styles.textInput, isRTL && styles.textInputRTL]}
                value={lastName}
                onChangeText={setLastName}
                placeholder={t("lastName")}
                textAlign={isRTL ? "right" : "left"}
              />
            </View>
          </View>

          <View style={styles.emailContainer}>
            <Text style={[styles.inputLabel, !isRTL && styles.textRTL]}>
              {t("email")}
            </Text>
            <TextInput
              style={[styles.textInput, isRTL && styles.textInputRTL]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={t("email")}
              textAlign={isRTL ? "right" : "left"}
            />
          </View>

          <View style={styles.mobileContainer}>
            <Text style={[styles.inputLabel, !isRTL && styles.textRTL]}>
              {t("mobile")}
            </Text>
            <View
              style={[
                styles.mobileInputContainer,
                isRTL && styles.mobileInputContainerRTL,
              ]}
            >
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                <Text style={styles.countryDialCode}>
                  +{selectedCountry.dialCode}
                </Text>
              </View>
              <TextInput
                style={[styles.mobileInput, isRTL && styles.textInputRTL]}
                value={user.mobile || ""}
                editable={false}
                placeholder={t("phoneNumber")}
                textAlign={isRTL ? "right" : "left"}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentRTL: {
    direction: "rtl",
  },
  header: {
    backgroundColor: "#003B95",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRTL: {
    flexDirection: "row-reverse",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerLeftRTL: {
    flexDirection: "row-reverse",
  },
  iconRTL: {
    transform: [{ scaleX: -1 }],
  },
  headerTitle: {
    color: "#FFDA78",
    fontSize: 20,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFDA78",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFDA78",
    fontSize: 16,
    fontWeight: "600",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  profilePictureWrapper: {
    position: "relative",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f3f4f6",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFDA78",
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  formContainer: {
    gap: 24,
  },
  nameInputContainer: {
    flexDirection: "row",
    gap: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    color: "#4B5563",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  textInputRTL: {
    textAlign: "right",
  },
  textRTL: {
    textAlign: "right",
  },
  emailContainer: {
    gap: 8,
  },
  mobileContainer: {
    gap: 8,
  },
  mobileInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  mobileInputContainerRTL: {
    flexDirection: "row-reverse",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },
  countryFlag: {
    fontSize: 16,
  },
  countryDialCode: {
    fontSize: 16,
    color: "#4B5563",
  },
  mobileInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f3f4f6",
  },
});

export default EditProfileScreen;
