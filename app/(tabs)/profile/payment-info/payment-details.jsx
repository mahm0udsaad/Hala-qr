import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/linearGradient";
import { useUser } from "@/context/";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function PaymentDetailsScreen() {
  const router = useRouter();
  const { token } = useUser();
  const { package: selectedPackage } = useLocalSearchParams();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [previousCouponCode, setPreviousCouponCode] = useState("");
  const { t, i18n } = useTranslation();

  // Parse the package details from the route params
  const packageDetails = selectedPackage
    ? JSON.parse(decodeURIComponent(selectedPackage))
    : null;

  const handleApplyCoupon = async () => {
    // Remove the previous coupon code check since we want to allow reapplication
    setIsApplyingCoupon(true);

    try {
      const formData = new FormData();
      formData.append("package_id", packageDetails.id);
      formData.append("code", couponCode);

      const response = await fetch(
        "https://hala-qr.jmintel.net/api/v1/coupons/check",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (result.status) {
        setCouponDiscount({
          discount: result.data.discount,
          finalTotal: result.data.final_total,
        });
        setPreviousCouponCode(couponCode);
        Alert.alert(t("Success"), result.message);
      } else {
        // Clear any previous discount if the new coupon is invalid
        setCouponDiscount(null);
        setPreviousCouponCode("");
        Alert.alert("Error", result.message || "Invalid coupon");
      }
    } catch (error) {
      // Clear any previous discount if there's an error
      setCouponDiscount(null);
      setPreviousCouponCode("");
      Alert.alert("Error", "Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Update the coupon input handler
  const handleCouponChange = (text) => {
    setCouponCode(text);
    // Only clear the discount if the text is different from the previously applied coupon
    if (text !== previousCouponCode) {
      setCouponDiscount(null);
    }
  };

  const handleCheckout = async () => {
    if (!packageDetails?.id) {
      Toast.show({
        type: "error",
        text1: t("Error"),
        text2: t("Invalid package selected"),
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch(
        `https://hala-qr.jmintel.net/api/v1/packages/${packageDetails.id}/subscribe`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          // If you need to send coupon code with subscription
          body: couponDiscount
            ? JSON.stringify({ coupon_code: couponCode })
            : null,
        },
      );

      const result = await response.json();

      if (response.ok && result.status) {
        Toast.show({
          type: "success",
          text1: t("Success"),
          text2: result.message || t("Subscription successful"),
        });
      } else {
        throw new Error(result.message || t("Subscription failed"));
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("Error"),
        text2: error.message || t("Failed to process subscription"),
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!packageDetails) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text>No package selected</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("paymentInfo")}</Text>
        </View>

        {/* Package Receipt */}
        <View style={[styles.receiptContainer, { direction: i18n.dir() }]}>
          <Text style={styles.receiptTitle}>{packageDetails.name}</Text>

          <View style={styles.receiptDetails}>
            <ReceiptItem
              label={t("package.oldPrice")}
              value={`$${packageDetails.old_price}`}
            />
            <ReceiptItem
              label={t("package.designPrice")}
              value={`$${packageDetails.price}`}
            />
            <ReceiptItem
              label={t("package.designs")}
              value={packageDetails.num_designs}
            />
            <ReceiptItem
              label={t("package.invitations")}
              value={packageDetails.num_of_invitations}
            />
            <ReceiptItem
              label={t("package.duration")}
              value={`${packageDetails.num_of_days} ${t("premium.days")}`}
            />

            {couponDiscount && (
              <View style={styles.discountContainer}>
                <Text style={styles.discountLabel}>{t("couponDiscount")}</Text>
                <Text style={styles.discountValue}>
                  {couponDiscount.discount}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>
              {couponDiscount ? t("discountedTotal") : t("total")}
            </Text>
            <Text style={styles.totalValue}>
              $
              {couponDiscount
                ? couponDiscount.finalTotal
                : packageDetails.price}
            </Text>
          </View>
        </View>

        {/* Coupon Section */}
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholder={t("enterCouponCode")}
            value={couponCode}
            onChangeText={handleCouponChange}
          />
          <TouchableOpacity
            style={[
              styles.applyCouponButton,
              (isApplyingCoupon || !couponCode) && styles.disabledButton,
            ]}
            onPress={handleApplyCoupon}
            disabled={isApplyingCoupon || !couponCode}
          >
            {isApplyingCoupon ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.applyCouponText}>{t("apply")}</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Checkout Button */}
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            isSubscribing && styles.disabledButton,
          ]}
          onPress={handleCheckout}
          disabled={isSubscribing}
        >
          {isSubscribing ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.checkoutButtonText}>
              {t("proceedToCheckout")}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}

// Reusable Receipt Item Component
const ReceiptItem = ({ label, value }) => (
  <View style={styles.receiptItem}>
    <Text style={styles.receiptItemLabel}>{label}</Text>
    <Text style={styles.receiptItemValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B95",
  },
  receiptContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003B95",
    marginBottom: 16,
    textAlign: "center",
  },
  receiptDetails: {
    marginBottom: 16,
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  receiptItemLabel: {
    color: "#6B7280",
    fontSize: 14,
  },
  receiptItemValue: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  discountLabel: {
    color: "#10B981",
    fontSize: 14,
  },
  discountValue: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B95",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003B95",
  },
  couponContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  applyCouponButton: {
    backgroundColor: "#003B95",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  applyCouponText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  checkoutButton: {
    backgroundColor: "#10B981",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
