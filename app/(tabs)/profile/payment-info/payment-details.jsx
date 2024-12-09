import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../../../components/card";
import CreditCardForm from "../../../../components/forms/payment-info";
import GradientBackground from "@/components/linearGradient";
import { useRouter } from "expo-router";

const PaymentDetails = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cardNumber: "",
    name: "",
    cardId: "",
    expirationDate: "",
    cvv: "",
  });

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#000000" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Payment Details</Text>
          </View>
        </View>

        {/* Credit Card Preview */}
        <CardComponent cardInfo={formData} />

        {/* Form Fields */}
        <CreditCardForm formData={formData} setFormData={setFormData} />

        {/* Pay Button */}
        <Pressable style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay</Text>
        </Pressable>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "transparent",
    padding: 16, // Tailwind's `p-4`
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8, // Tailwind's `py-2`
    paddingTop: 32, // Tailwind's `pt-8`
  },
  closeButton: {
    padding: 8, // Tailwind's `p-2`
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 24, // Tailwind's `mr-6`
  },
  headerTitle: {
    fontSize: 24, // Tailwind's `text-2xl`
    fontWeight: "bold", // Tailwind's `font-bold`
    marginBottom: 8, // Tailwind's `mb-2`
  },
  payButton: {
    backgroundColor: "#2563EB", // Tailwind's `bg-blue-600`
    borderRadius: 8, // Tailwind's `rounded-lg`
    paddingVertical: 16, // Tailwind's `py-4`
    marginTop: 16, // Add spacing for better layout
  },
  payButtonText: {
    textAlign: "center",
    color: "#FFFFFF", // Tailwind's `text-white`
    fontWeight: "600", // Tailwind's `font-semibold`
  },
});

export default PaymentDetails;
