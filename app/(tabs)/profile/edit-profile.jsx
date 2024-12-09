import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const EditProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePictureWrapper}>
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePictureText}>H</Text>
          </View>
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Ionicons name="camera-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.nameInputContainer}>
          <View style={styles.nameInputWrapper}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput style={styles.textInput} defaultValue="Mahmoud" />
          </View>
          <View style={styles.nameInputWrapper}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput style={styles.textInput} defaultValue="Saad" />
          </View>
        </View>

        <View style={styles.emailInputContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            defaultValue="example@server.com"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Image
                source={{ uri: "https://flagcdn.com/w40/ae.png" }}
                style={styles.flagImage}
              />
              <Text>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
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
  profilePictureContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  profilePictureWrapper: {
    position: "relative",
  },
  profilePicturePlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureText: {
    color: "#FBBF24",
    fontSize: 36,
    fontWeight: "bold",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    padding: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  nameInputWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  inputLabel: {
    color: "#4B5563",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emailInputContainer: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: "row",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  flagImage: {
    width: 24,
    height: 16,
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default EditProfileScreen;
