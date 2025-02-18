import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientBackground from "@/components/linearGradient";
import useFetch from "../../../../hooks/use-fetch";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const getResponsiveWidth = (baseWidth) => {
  const scaleFactor = SCREEN_WIDTH / 375;
  return Math.min(baseWidth * scaleFactor, baseWidth * 1.3);
};

export default function GoPremiumScreen() {
  const { t, i18n } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { data, isLoading } = useFetch("/packages/index");
  const router = useRouter();

  const packages = data || [];
  const isRTL = i18n.language === "ar";

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { maxWidth: getResponsiveWidth(450), alignSelf: "center" },
        ]}
      >
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.title}>{t("premium.title")}</Text>
          <Text style={styles.subtitle}>{t("premium.subtitle")}</Text>
          <Image
            source={require("@/assets/images/premium.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.packagesContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#003B95" />
            </View>
          ) : packages.length === 0 ? (
            <View style={styles.noPackagesContainer}>
              <Text style={styles.noPackagesText}>
                {t("premium.noPackages")}
              </Text>
            </View>
          ) : (
            packages.map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                onPress={() => setSelectedPackage(pkg)}
                style={[
                  styles.packageCard,
                  selectedPackage?.name === pkg?.name &&
                    styles.selectedPackageCard,
                  { width: getResponsiveWidth(320), alignSelf: "center" },
                ]}
              >
                <View style={styles.packageContent}>
                  <View style={[styles.packageHeader, isRTL && styles.rtlRow]}>
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    <Text style={styles.packagePrice}>${pkg.price}</Text>
                  </View>

                  <View style={styles.packageDetails}>
                    <PackageDetailItem
                      label={t("package.oldPrice")}
                      value={`$${pkg.old_price}`}
                      isRTL={isRTL}
                    />
                    <PackageDetailItem
                      label={t("package.designs")}
                      value={pkg.num_designs}
                      isRTL={isRTL}
                    />
                    <PackageDetailItem
                      label={t("package.invitations")}
                      value={pkg.num_of_invitations}
                      isRTL={isRTL}
                    />
                    <PackageDetailItem
                      label={t("package.designPrice")}
                      value={`$${pkg.design_price}`}
                      isRTL={isRTL}
                    />
                    <PackageDetailItem
                      label={t("package.invitationPrice")}
                      value={`$${pkg.invitation_price}`}
                      isRTL={isRTL}
                    />
                    <PackageDetailItem
                      label={t("package.duration")}
                      value={`${pkg.num_of_days} ${t("premium.days")}`}
                      isRTL={isRTL}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity
          disabled={!selectedPackage}
          onPress={() =>
            router.push({
              pathname: "/profile/payment-info/payment-details",
              params: {
                package: encodeURIComponent(JSON.stringify(selectedPackage)),
              },
            })
          }
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>
            {selectedPackage
              ? `${t("premium.cta")} ${selectedPackage.num_of_days} ${t("day")}`
              : t("premium.cta_default")}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          {t("premium.terms", {
            terms: t("premium.terms.service"),
            privacy: t("premium.privacy.policy"),
          })}
        </Text>
      </ScrollView>
    </GradientBackground>
  );
}

const PackageDetailItem = ({ label, value, isRTL }) => (
  <View style={[styles.packageDetailItem, isRTL && styles.rtlRow]}>
    <Text
      style={[
        styles.packageDetailLabel,
        isRTL ? { textAlign: "left" } : { textAlign: "right" },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        styles.packageDetailValue,
        isRTL ? { textAlign: "right" } : { textAlign: "left" },
      ]}
    >
      {value}
    </Text>
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
    justifyContent: "between",
    marginBottom: 24,
    width: "100%",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B95",
  },
  packagesContainer: {
    flex: 1,
    marginBottom: 24,
  },
  packageCard: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  selectedPackageCard: {
    borderColor: "#003B95",
    backgroundColor: "#F3F4F6",
  },
  packageContent: {
    flexDirection: "column",
    width: "100%",
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "100%",
  },
  rtlRow: {
    flexDirection: "row-reverse",
  },
  packageName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003B95",
  },
  packageDetails: {
    flexDirection: "column",
    width: "100%",
  },
  packageDetailItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    width: "100%",
  },
  packageDetailLabel: {
    color: "#6B7280",
    fontSize: 14,
  },
  packageDetailValue: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  ctaButton: {
    backgroundColor: "#003B95",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ctaButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  termsText: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "center",
  },
  underlineText: {
    textDecorationLine: "underline",
    color: "#003B95",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noPackagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noPackagesText: {
    fontSize: 16,
    color: "#6B7280",
  },
  centerContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B95",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginHorizontal: 24,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  iconButton: {
    padding: 8,
  },
});
