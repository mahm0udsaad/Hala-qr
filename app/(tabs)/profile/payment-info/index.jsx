import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import GradientBackground from "@/components/linearGradient";

export default function GoPremiumScreen() {
  const [selectedPackage, setSelectedPackage] = useState("Platinum");
  const router = useRouter();

  const packages = [
    { name: "Platinum", price: "$999/Month", valueTag: "Best Value" },
    { name: "Gold", price: "$99/Month", valueTag: "" },
    { name: "Silver", price: "$9/Month", valueTag: "" },
  ];

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Title and Image */}
        <View style={styles.centerContent}>
          <Text style={styles.title}>Go Premium</Text>
          <Text style={styles.subtitle}>
            Unlock all the power of this mobile tool and enjoy a digital
            experience like never before!
          </Text>
          <Image
            source={require("@/assets/images/premium.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Pricing Options */}
        <View style={styles.pricingContainer}>
          {packages.map((pkg) => (
            <TouchableOpacity
              key={pkg.name}
              onPress={() => setSelectedPackage(pkg.name)}
              style={[
                styles.packageOption,
                selectedPackage === pkg.name && styles.selectedPackageOption,
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.packageName,
                    selectedPackage === pkg.name && styles.selectedText,
                  ]}
                >
                  {pkg.name}
                </Text>
                <Text
                  style={[
                    styles.packagePrice,
                    selectedPackage === pkg.name && styles.selectedText,
                  ]}
                >
                  {pkg.price}
                </Text>
              </View>
              {pkg.valueTag ? (
                <View style={styles.valueTag}>
                  <Text style={styles.valueTagText}>{pkg.valueTag}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => router.push("/profile/payment-info/payment-details")}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Start 30-day now</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
          By placing this order, you agree to the{" "}
          <Text style={styles.underlineText}>Terms of Service</Text> and{" "}
          <Text style={styles.underlineText}>Privacy Policy</Text>. Subscription
          automatically renews unless auto-renew is turned off at least 24 hours
          before the end of the current period.
        </Text>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24, // Tailwind's `p-6`
  },
  closeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16, // Tailwind's `py-4`
  },
  iconButton: {
    padding: 8, // Tailwind's `p-2`
  },
  centerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 24, // Tailwind's `text-2xl`
    fontWeight: "bold", // Tailwind's `font-bold`
    color: "#003b95", // Tailwind's `text-blue-800`
    marginBottom: 8, // Tailwind's `mb-2`
  },
  subtitle: {
    color: "#6B7280", // Tailwind's `text-gray-500`
    textAlign: "center",
    marginBottom: 24, // Tailwind's `mb-6`
  },
  image: {
    width: 168, // Tailwind's `size-42`
    height: 168,
    marginBottom: 24, // Tailwind's `mb-6`
  },
  pricingContainer: {
    marginBottom: 24, // Tailwind's `mb-6`
  },
  packageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16, // Tailwind's `p-4`
    borderWidth: 1, // Tailwind's `border`
    borderRadius: 8, // Tailwind's `rounded-lg`
    borderColor: "#D1D5DB", // Tailwind's `border-gray-300`
    marginBottom: 16, // Tailwind's `mb-4`
  },
  selectedPackageOption: {
    borderColor: "#93C5FD", // Tailwind's `border-blue-300`
    backgroundColor: "#EFF6FF", // Tailwind's `bg-blue-50`
  },
  packageName: {
    fontSize: 18, // Tailwind's `text-lg`
    fontWeight: "bold", // Tailwind's `font-bold`
    color: "#374151", // Tailwind's `text-gray-700`
  },
  packagePrice: {
    color: "#374151", // Tailwind's `text-gray-700`
  },
  selectedText: {
    color: "#003b95", // Tailwind's `text-blue-800`
  },
  valueTag: {
    backgroundColor: "#10B981", // Tailwind's `bg-green-500`
    paddingVertical: 4, // Tailwind's `py-1`
    paddingHorizontal: 8, // Tailwind's `px-2`
    borderRadius: 4, // Tailwind's `rounded`
  },
  valueTagText: {
    color: "#FFFFFF", // Tailwind's `text-white`
    fontSize: 12, // Tailwind's `text-xs`
  },
  ctaButton: {
    backgroundColor: "#003b95", // Tailwind's `bg-[#003b95]`
    paddingVertical: 16, // Tailwind's `py-4`
    borderRadius: 8, // Tailwind's `rounded-lg`
  },
  ctaButtonText: {
    textAlign: "center",
    color: "#FFFFFF", // Tailwind's `text-white`
    fontWeight: "bold", // Tailwind's `font-bold`
    fontSize: 18, // Tailwind's `text-lg`
  },
  termsText: {
    color: "#9CA3AF", // Tailwind's `text-gray-400`
    fontSize: 12, // Tailwind's `text-xs`
    textAlign: "center",
    marginVertical: 16, // Tailwind's `my-4`
    paddingBottom: 40, // Tailwind's `pb-10`
  },
  underlineText: {
    textDecorationLine: "underline", // Tailwind's `underline`
  },
});
