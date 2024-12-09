import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Card from "../assets/svg/card.svg";

const { width: screenWidth } = Dimensions.get("window");

const CardComponent = ({ cardInfo }) => {
  const cardWidth = screenWidth - 40; // Full width minus some padding
  const cardHeight = cardWidth * 0.63; // Standard credit card aspect ratio

  // Format card number with spaces every 4 digits
  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.cardWrapper, { width: cardWidth, height: cardHeight }]}
      >
        <Card width="100%" height="100%" />
        <View style={styles.overlay}>
          <Text style={styles.cardNumber}>
            {formatCardNumber(cardInfo.cardNumber)}
          </Text>

          <Text style={styles.cardHolderTitle}>CARD HOLDER</Text>
          <Text style={styles.cardHolder}>{cardInfo.name}</Text>

          <Text style={styles.expiryDateTitle}>EXPIRES</Text>
          <Text style={styles.expiryDate}>{cardInfo.expirationDate}</Text>

          <Text style={styles.cvvTitle}>CVV</Text>
          <Text style={styles.cvv}>{cardInfo.cvv}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardWrapper: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "5%",
  },
  cardNumberTitle: {
    position: "absolute",
    top: "10%",
    left: "5%",
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  cardNumber: {
    position: "absolute",
    top: "45%",
    left: "5%",
    fontSize: 18,
    color: "#000",
    letterSpacing: 2,
  },
  cardHolderTitle: {
    position: "absolute",
    bottom: "25%",
    left: "5%",
    fontSize: 10,
    color: "#000",
    opacity: 0.7,
  },
  cardHolder: {
    position: "absolute",
    bottom: "15%",
    left: "5%",
    fontSize: 14,
    color: "#000",
  },
  expiryDateTitle: {
    position: "absolute",
    bottom: "25%",
    right: "25%",
    fontSize: 10,
    color: "#000",
    opacity: 0.7,
  },
  expiryDate: {
    position: "absolute",
    bottom: "15%",
    right: "25%",
    fontSize: 14,
    color: "#000",
  },
  cvvTitle: {
    position: "absolute",
    bottom: "25%",
    right: "5%",
    fontSize: 10,
    color: "#000",
    opacity: 0.7,
  },
  cvv: {
    position: "absolute",
    bottom: "15%",
    right: "5%",
    fontSize: 14,
    color: "#000",
  },
});

export default CardComponent;
