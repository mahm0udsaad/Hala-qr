import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{placeholder}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const CreditCardForm = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "cardNumber":
        error = validateCardNumber(value);
        break;
      case "name":
        error = validateName(value);
        break;
      case "cardId":
        error = validateCardId(value);
        break;
      case "expirationDate":
        error = validateExpirationDate(value);
        break;
      case "cvv":
        error = validateCVV(value);
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const validateCardNumber = (value) => {
    if (!/^[0-9]{16}$/.test(value)) {
      return "Card number must be 16 digits";
    }
    return "";
  };

  const validateName = (value) => {
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const validateCardId = (value) => {
    if (!/^[0-9]{3,4}$/.test(value)) {
      return "Card ID must be 3 or 4 digits";
    }
    return "";
  };

  const validateExpirationDate = (value) => {
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value)) {
      return "Use format MM/YY";
    }
    return "";
  };

  const validateCVV = (value) => {
    if (!/^[0-9]{3,4}$/.test(value)) {
      return "CVV must be 3 or 4 digits";
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Card Number"
        value={formData.cardNumber}
        onChangeText={(value) => handleInputChange("cardNumber", value)}
        keyboardType="numeric"
        maxLength={16}
        error={errors.cardNumber}
      />

      <Input
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange("name", value)}
        error={errors.name}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Input
            placeholder="Expiration Date"
            value={formData.expirationDate}
            onChangeText={(value) => handleInputChange("expirationDate", value)}
            keyboardType="numeric"
            maxLength={5}
            error={errors.expirationDate}
          />
        </View>
        <View style={styles.column}>
          <Input
            placeholder="CVV"
            value={formData.cvv}
            onChangeText={(value) => handleInputChange("cvv", value)}
            keyboardType="numeric"
            maxLength={4}
            error={errors.cvv}
          />
        </View>
      </View>

      <Input
        placeholder="Card ID"
        value={formData.cardId}
        onChangeText={(value) => handleInputChange("cardId", value)}
        keyboardType="numeric"
        maxLength={4}
        error={errors.cardId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "transparent",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  input: {
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
});

export default CreditCardForm;
