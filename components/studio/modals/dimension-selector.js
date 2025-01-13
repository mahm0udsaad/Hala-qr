import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";

const DimensionSelector = ({ isVisible, onSelect, paperSizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = (paperSize, sizeInfo) => {
    setSelectedSize(paperSize);
    onSelect({
      paperSize,
      width: sizeInfo.width,
      height: sizeInfo.height,
      ratio: sizeInfo.ratio,
    });
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            width: "90%",
            maxHeight: "90%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Select Invitation Size
          </Text>

          <ScrollView>
            {Object.entries(paperSizes).map(([size, info]) => {
              const isSelected = selectedSize === size;

              return (
                <Pressable
                  key={size}
                  onPress={() => handleSelect(size, info)}
                  style={({ pressed }) => ({
                    backgroundColor: isSelected
                      ? "#e5e5e5"
                      : pressed
                      ? "#f0f0f0"
                      : "#fff",
                    padding: 16,
                    borderRadius: 8,
                    marginVertical: 4,
                    borderWidth: 2,
                    borderColor: isSelected ? "#1e3a8a" : "#e5e5e5",
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: isSelected ? "#1e3a8a" : "#000",
                        }}
                      >
                        {info.label}
                      </Text>
                      <Text style={{ color: "#666", marginTop: 4 }}>
                        {(info.width / 300).toFixed(2)}″ ×{" "}
                        {(info.height / 300).toFixed(2)}″
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 60,
                        height: 60 * (info.height / info.width),
                        backgroundColor: "#f0f0f0",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DimensionSelector;
