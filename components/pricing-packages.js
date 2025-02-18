import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";

const PackageDetailItem = ({
  packageType,
  price,
  oldPrice,
  designs,
  invitations,
  designPrice,
  invitationPrice,
  duration,
  isRTL = true, // Default to RTL for Arabic
}) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      maxWidth: 500, // Limit width on larger screens
      alignSelf: "center",
      backgroundColor: "white",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      padding: 16,
      marginVertical: 8,
    },
    row: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      width: "100%",
    },
    labelContainer: {
      flex: 1,
      alignItems: isRTL ? "flex-start" : "flex-end",
    },
    valueContainer: {
      flex: 1,
      alignItems: isRTL ? "flex-end" : "flex-start",
    },
    packageTitle: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: isRTL ? "left" : "right",
      color: "#1F2937",
    },
    label: {
      fontSize: 16,
      color: "#6B7280",
      textAlign: isRTL ? "left" : "right",
    },
    value: {
      fontSize: 16,
      color: "#1F2937",
      textAlign: isRTL ? "right" : "left",
    },
    price: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#2563EB",
    },
    oldPrice: {
      fontSize: 16,
      color: "#9CA3AF",
      textDecorationLine: "line-through",
    },
  });

  const renderRow = (label, value) => (
    <View style={styles.row}>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Package Type and Current Price */}
      {renderRow(packageType, <Text style={styles.price}>${price}</Text>)}

      {/* Old Price */}
      {renderRow(
        "السعر القديم",
        <Text style={styles.oldPrice}>${oldPrice}</Text>,
      )}

      {/* Designs */}
      {renderRow("التصاميم", designs)}

      {/* Invitations */}
      {renderRow("الدعوات", invitations)}

      {/* Design Price */}
      {renderRow("سعر التصميم", `$${designPrice}`)}

      {/* Invitation Price */}
      {renderRow("سعر الدعوة", `$${invitationPrice}`)}

      {/* Duration */}
      {renderRow("المدة", `${duration} أيام`)}
    </View>
  );
};

export default PackageDetailItem;
